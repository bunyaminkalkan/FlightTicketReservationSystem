package com.example.FlightTicketReservationSystem.service;

import com.example.FlightTicketReservationSystem.exception.FlightNotFoundException;
import com.example.FlightTicketReservationSystem.model.Flight;
import com.example.FlightTicketReservationSystem.repository.FlightRepository;
import com.example.FlightTicketReservationSystem.request.AddFlightRequest;
import com.example.FlightTicketReservationSystem.request.FilterFlightsRequest;
import com.example.FlightTicketReservationSystem.request.SearchFlightsRequest;
import com.example.FlightTicketReservationSystem.request.UpdateFlightRequest;
import com.example.FlightTicketReservationSystem.response.ConnectingFlightResponse;
import com.example.FlightTicketReservationSystem.response.SearchFlightsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private SearchFlightsResponse searchFlightsResponse;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public SearchFlightsResponse searchFlights(String departureLocation, LocalDate departureDay, String arrivalLocation, String airlineCompany) {
        SearchFlightsRequest request = new SearchFlightsRequest(departureLocation, departureDay, arrivalLocation, airlineCompany);
        List<Flight> directFlights = flightRepository.findByDepartureLocationAndDepartureDate(request.getDepartureLocation(), request.getDepartureDay().toString())
                .orElse(Collections.emptyList()).stream()
                .filter(flight -> flight.getArrivalLocation().equals(request.getArrivalLocation()))
                .filter(flight -> request.getAirlineCompany() == null || request.getAirlineCompany().isEmpty() || flight.getPlaneNumber().startsWith(request.getAirlineCompany()))
                .toList();

        List<Flight> sameDepartureLocationFlights = flightRepository.findByDepartureLocationAndDepartureDate(request.getDepartureLocation(), request.getDepartureDay().toString()).orElse(Collections.emptyList());
        List<Flight> sameArrivalLocationFlights = flightRepository.findByArrivalLocation(request.getArrivalLocation()).orElse(Collections.emptyList());
        List<ConnectingFlightResponse> connectingFlights = new ArrayList<>();

        for (Flight sameDepartureFlight : sameDepartureLocationFlights) {
            for (Flight sameArrivalFlight : sameArrivalLocationFlights) {
                if (isValidConnectingFlight(request, sameDepartureFlight, sameArrivalFlight)) {
                    ConnectingFlightResponse connectingFlight = new ConnectingFlightResponse(sameDepartureFlight, sameArrivalFlight);
                    connectingFlights.add(connectingFlight);
                }
            }
        }

        searchFlightsResponse = new SearchFlightsResponse(directFlights, connectingFlights);
        return searchFlightsResponse;
    }

    public SearchFlightsResponse filterFlights(Boolean isDirectFlight, Integer maxPrice, LocalTime maxFlightTime) {
        FilterFlightsRequest request = new FilterFlightsRequest(isDirectFlight, maxPrice, maxFlightTime);
        SearchFlightsResponse filteredFlights = new SearchFlightsResponse();

        if(request.getIsDirectFlight() != null) {
            setFlightsByType(filteredFlights, request.getIsDirectFlight());
        } else {
            filteredFlights.setDirectFlights(searchFlightsResponse.getDirectFlights());
            filteredFlights.setConnectingFlights(searchFlightsResponse.getConnectingFlights());
        }

        if (request.getMaxPrice() != null) filterFlightsByPrice(filteredFlights, request.getMaxPrice());
        if (request.getMaxFlightTime() != null) filterFlightsByTime(filteredFlights, request.getMaxFlightTime());

        return filteredFlights;
    }

    public Flight createFlight(AddFlightRequest request) {
        Flight flight = new Flight();
        flight.setId(flightRepository.count()+1);
        flight.setFlightNumber(request.getFlightNumber());
        flight.setPlaneNumber(request.getPlaneNumber());
        flight.setBusinessPrice(request.getBusinessPrice());
        flight.setEconomyPrice(request.getEconomyPrice());
        flight.setDepartureLocation(request.getDepartureLocation());
        flight.setDepartureDate(request.getDepartureDate());
        flight.setArrivalLocation(request.getArrivalLocation());
        flight.setArrivalDate(request.getArrivalDate());

        List<Integer> businessSeat = IntStream.range(1,request.getBusinessSeatCount()+1).boxed().toList();
        List<Integer> economySeat = IntStream.range(1,request.getEconomySeatCount()+1).boxed().toList();

        flight.setBusinessSeat(businessSeat);
        flight.setEconomySeat(economySeat);

        LocalTime flightTime = calculateFlightTime(request.getDepartureDate(), request.getArrivalDate());
        flight.setFlightTime(flightTime);
        flightRepository.save(flight);
        return flight;
    }

    public Flight updateFlight(Long id, UpdateFlightRequest request) {
        Flight flight = flightRepository.findById(id).orElseThrow(FlightNotFoundException::new);
        updateFlightWithNewFlight(flight, request);
        return flightRepository.save(flight);
    }

    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }

    private void setFlightsByType(SearchFlightsResponse filteredFlights, boolean isDirectFlight) {
        if(isDirectFlight) {
            filteredFlights.setDirectFlights(searchFlightsResponse.getDirectFlights());
            filteredFlights.setConnectingFlights(new ArrayList<>());
        } else {
            filteredFlights.setConnectingFlights(searchFlightsResponse.getConnectingFlights());
            filteredFlights.setDirectFlights(new ArrayList<>());
        }
    }

    private void filterFlightsByPrice(SearchFlightsResponse filteredFlights, Integer maxPrice) {
        filteredFlights.setDirectFlights(filteredFlights.getDirectFlights().stream().filter(flight -> flight.getEconomyPrice() <= maxPrice).toList());
        filteredFlights.setConnectingFlights(filteredFlights.getConnectingFlights().stream().filter(flight -> flight.getTotalEconomyPrice() <= maxPrice).toList());
    }

    private void filterFlightsByTime(SearchFlightsResponse filteredFlights, LocalTime maxFlightTime) {
        filteredFlights.setDirectFlights(filteredFlights.getDirectFlights().stream().filter(flight -> flight.getFlightTime().isBefore(maxFlightTime) || flight.getFlightTime().equals(maxFlightTime)).toList());
        filteredFlights.setConnectingFlights(filteredFlights.getConnectingFlights().stream().filter(flight -> flight.getTotalTime().isBefore(maxFlightTime) || flight.getTotalTime().equals(maxFlightTime)).toList());
    }

    private boolean isValidConnectingFlight(SearchFlightsRequest request, Flight sameDepartureFlight, Flight sameArrivalFlight) {
        return sameDepartureFlight.getArrivalLocation().equals(sameArrivalFlight.getDepartureLocation())
                && isValidArrivalDate(sameDepartureFlight, sameArrivalFlight)
                && isValidAirlineCompanyForFlights(request, sameDepartureFlight, sameArrivalFlight);
    }

    private boolean isValidAirlineCompanyForFlights(SearchFlightsRequest request, Flight sameDepartureFlight, Flight sameArrivalFlight) {
        if (request.getAirlineCompany() == null || request.getAirlineCompany().isEmpty()) {
            return true;
        }
        return sameDepartureFlight.getPlaneNumber().startsWith(request.getAirlineCompany()) || sameArrivalFlight.getPlaneNumber().startsWith(request.getAirlineCompany());
    }

    private boolean isValidArrivalDate(Flight sameDepartureFlight, Flight sameArrivalFlight) {
        return sameArrivalFlight.getDepartureDate().isAfter(sameDepartureFlight.getArrivalDate().plusMinutes(25))
                && sameArrivalFlight.getDepartureDate().isBefore(sameDepartureFlight.getArrivalDate().plusHours(12).plusMinutes(1));
    }

    private void updateFlightWithNewFlight(Flight flight, UpdateFlightRequest request) {
        flight.setFlightNumber(request.getFlightNumber());
        flight.setPlaneNumber(request.getPlaneNumber());
        flight.setDepartureLocation(request.getDepartureLocation());
        flight.setDepartureDate(request.getDepartureDate());
        flight.setArrivalLocation(request.getArrivalLocation());
        flight.setArrivalDate(request.getArrivalDate());
        flight.setEconomyPrice(request.getEconomyPrice());
        flight.setBusinessPrice(request.getBusinessPrice());
        flight.setFlightTime(calculateFlightTime(request.getDepartureDate(), request.getArrivalDate()));
    }

    private LocalTime calculateFlightTime(LocalDateTime departureDate, LocalDateTime arrivalDate) {
        Duration duration = Duration.between(departureDate, arrivalDate);
        long seconds = duration.getSeconds();
        long hours = seconds / 3600;
        long minutes = (seconds % 3600) / 60;
        long remainingSeconds = seconds % 60;
        return LocalTime.of((int) hours, (int) minutes, (int) remainingSeconds);
    }
}
