package com.example.FlightTicketReservationSystem.service;

import com.example.FlightTicketReservationSystem.model.Flight;
import com.example.FlightTicketReservationSystem.repository.FlightRepository;
import com.example.FlightTicketReservationSystem.request.SearchFlightsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private List<Flight> searchedFlights;

    public List<Flight> getAllFlightsWithSearch(SearchFlightsRequest request) {
        System.out.println(flightRepository.findByDepartureLocation(request.getDepartureLocation()));
        searchedFlights = flightRepository.findByDepartureLocation(request.getDepartureLocation()).orElse(null);
        searchedFlights = searchedFlights != null ? searchedFlights.stream()
                .filter(flight -> flight.getDepartureDate().toLocalDate().isEqual(request.getDepartureDay()))
                .filter(flight -> flight.getArrivalLocation().equals(request.getArrivalLocation()))
                .filter(flight -> request.getAirlineCompany() == null || request.getAirlineCompany().isEmpty() || flight.getPlaneNumber().startsWith(request.getAirlineCompany()))
                .collect(Collectors.toList()) : null;
        return searchedFlights;
    }

    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }
}
