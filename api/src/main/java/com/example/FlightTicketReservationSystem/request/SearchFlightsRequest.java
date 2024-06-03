package com.example.FlightTicketReservationSystem.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SearchFlightsRequest {
    private String departureLocation;
    private LocalDate departureDay;
    private String arrivalLocation;
    private String airlineCompany;
}
