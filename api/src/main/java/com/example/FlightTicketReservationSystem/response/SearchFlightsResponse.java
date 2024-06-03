package com.example.FlightTicketReservationSystem.response;

import com.example.FlightTicketReservationSystem.model.Flight;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SearchFlightsResponse {
    private List<Flight> directFlights;
    private List<ConnectingFlightResponse> connectingFlights;
}