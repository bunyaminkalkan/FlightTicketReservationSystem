package com.example.FlightTicketReservationSystem.service;

import com.example.FlightTicketReservationSystem.model.Flight;
import com.example.FlightTicketReservationSystem.repository.FlightRepository;
import com.example.FlightTicketReservationSystem.request.FilterFlightsRequest;
import com.example.FlightTicketReservationSystem.request.SearchFlightsRequest;
import com.example.FlightTicketReservationSystem.response.ConnectingFlightResponse;
import com.example.FlightTicketReservationSystem.response.SearchFlightsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private SearchFlightsResponse searchFlightsResponse;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public SearchFlightsResponse searchFlights(SearchFlightsRequest request) {
        List<Flight> directFlights = flightRepository.findByDepartureLocation(request.getDepartureLocation())
                .orElse(Collections.emptyList()).stream()
                .filter(flight -> flight.getDepartureDate().toLocalDate().isEqual(request.getDepartureDay()))
                .filter(flight -> flight.getArrivalLocation().equals(request.getArrivalLocation()))
                .filter(flight -> request.getAirlineCompany() == null || request.getAirlineCompany().isEmpty() || flight.getPlaneNumber().startsWith(request.getAirlineCompany()))
                .toList();

        List<Flight> sameDepartureLocationFlights = flightRepository.findByDepartureLocation(request.getDepartureLocation()).orElse(Collections.emptyList());
        List<Flight> sameArrivalLocationFlights = flightRepository.findByArrivalLocation(request.getArrivalLocation()).orElse(Collections.emptyList());
        List<ConnectingFlightResponse> connectingFlights = new ArrayList<>();
        for (Flight sameDepartureFlight : sameDepartureLocationFlights) {
            for (Flight sameArrivalFlight : sameArrivalLocationFlights) {
                if (sameDepartureFlight.getArrivalLocation().equals(sameArrivalFlight.getDepartureLocation()) &&
                        sameDepartureFlight.getDepartureDate().toLocalDate().isEqual(request.getDepartureDay()) &&
                        sameDepartureFlight.getArrivalDate().isBefore(sameArrivalFlight.getDepartureDate()) &&
                        sameArrivalFlight.getDepartureDate().isAfter(sameDepartureFlight.getArrivalDate().plusMinutes(25))) {
                    ConnectingFlightResponse connectingFlight = new ConnectingFlightResponse(sameDepartureFlight, sameArrivalFlight);
                    connectingFlights.add(connectingFlight);
                }
            }
        }

        searchFlightsResponse = new SearchFlightsResponse(directFlights, connectingFlights);
        return searchFlightsResponse;
    }

    public SearchFlightsResponse filterFlights(FilterFlightsRequest request) {
        SearchFlightsResponse filteredFlights = new SearchFlightsResponse();
        if(request.getIsDirectFlight() != null && request.getIsDirectFlight()) {
            filteredFlights.setDirectFlights(searchFlightsResponse.getDirectFlights());
            filteredFlights.setConnectingFlights(new ArrayList<>());
        } else if (request.getIsDirectFlight() != null) {
            filteredFlights.setConnectingFlights(searchFlightsResponse.getConnectingFlights());
            filteredFlights.setDirectFlights(new ArrayList<>());
        } else {
            filteredFlights.setDirectFlights(searchFlightsResponse.getDirectFlights());
            filteredFlights.setConnectingFlights(searchFlightsResponse.getConnectingFlights());
        }

        if (request.getMaxPrice() != null && request.getMaxPrice() > 0) {
            filteredFlights.setDirectFlights(filteredFlights.getDirectFlights().stream().filter(flight -> flight.getEconomyPrice() < request.getMaxPrice()).toList());
            filteredFlights.setConnectingFlights(filteredFlights.getConnectingFlights().stream().filter(flight -> flight.getTotalEconomyPrice() < request.getMaxPrice()).toList());
        }
        if (request.getMaxFlightTime() != null) {
            filteredFlights.setDirectFlights(filteredFlights.getDirectFlights().stream().filter(flight -> flight.getFlightTime().isBefore(request.getMaxFlightTime()) || flight.getFlightTime().equals(request.getMaxFlightTime())).toList());
            filteredFlights.setConnectingFlights(filteredFlights.getConnectingFlights().stream().filter(flight -> flight.getTotalTime().isBefore(request.getMaxFlightTime()) || flight.getTotalTime().equals(request.getMaxFlightTime())).toList());
        }

        return filteredFlights;
    }

    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }

}
