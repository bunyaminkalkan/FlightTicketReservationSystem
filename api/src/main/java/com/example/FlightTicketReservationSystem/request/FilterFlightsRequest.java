package com.example.FlightTicketReservationSystem.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class FilterFlightsRequest {
    private Boolean isDirectFlight;
    private Integer maxPrice;
    private LocalTime maxFlightTime;
}
