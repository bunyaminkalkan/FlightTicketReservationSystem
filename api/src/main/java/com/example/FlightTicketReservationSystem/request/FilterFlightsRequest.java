package com.example.FlightTicketReservationSystem.request;

import lombok.Data;

import java.time.LocalTime;

@Data
public class FilterFlightsRequest {
    private Boolean isDirectFlight;
    private Integer maxPrice;
    private LocalTime maxFlightTime;
}
