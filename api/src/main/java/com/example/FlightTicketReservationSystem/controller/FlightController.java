package com.example.FlightTicketReservationSystem.controller;

import com.example.FlightTicketReservationSystem.model.Flight;
import com.example.FlightTicketReservationSystem.request.FilterFlightsRequest;
import com.example.FlightTicketReservationSystem.request.SearchFlightsRequest;
import com.example.FlightTicketReservationSystem.response.SearchFlightsResponse;
import com.example.FlightTicketReservationSystem.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flights")
@RequiredArgsConstructor
public class FlightController {

    private final FlightService flightService;

    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @GetMapping("/search")
    public ResponseEntity<SearchFlightsResponse> searchFlights(@RequestBody SearchFlightsRequest request) {
        return ResponseEntity.ok(flightService.searchFlights(request));
    }

    @GetMapping("/filter")
    public ResponseEntity<SearchFlightsResponse> filterFlights(@RequestBody FilterFlightsRequest request) {
        return ResponseEntity.ok(flightService.filterFlights(request));
    }

    @PostMapping
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.createFlight(flight));
    }
}
