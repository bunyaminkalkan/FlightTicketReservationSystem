package com.example.FlightTicketReservationSystem.controller;

import com.example.FlightTicketReservationSystem.model.Flight;
import com.example.FlightTicketReservationSystem.response.SearchFlightsResponse;
import com.example.FlightTicketReservationSystem.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
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
    public ResponseEntity<SearchFlightsResponse> searchFlights(@RequestParam("departureLocation") String departureLocation
            , @RequestParam("arrivalLocation") String arrivalLocation
            , @RequestParam("departureDay") LocalDate departureDay
            , @RequestParam(name = "airlineCompany", required = false) String airlineCompany) {
        System.out.println("Search flights\n\n\n");
        System.out.println();
        return ResponseEntity.ok(flightService.searchFlights(departureLocation, departureDay, arrivalLocation, airlineCompany));
    }

    @GetMapping("/filter")
    public ResponseEntity<SearchFlightsResponse> filterFlights(@RequestParam(name = "isDirectFlight", required = false) Boolean isDirectFlight
            , @RequestParam(name = "maxPrice", required = false) Integer maxPrice
            , @RequestParam(name = "maxFlightTime", required = false) LocalTime maxFlightTime) {
        return ResponseEntity.ok(flightService.filterFlights(isDirectFlight, maxPrice, maxFlightTime));
    }

    @PostMapping
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.createFlight(flight));
    }
}
