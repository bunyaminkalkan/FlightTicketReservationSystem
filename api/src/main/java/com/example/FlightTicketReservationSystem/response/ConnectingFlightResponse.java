package com.example.FlightTicketReservationSystem.response;

import lombok.Data;

import java.time.LocalTime;

@Data
public class ConnectingFlightResponse {
    private String flightNumber1;
    private String flightNumber2;
    private Integer totalEconomyPrice;
    private Integer totalBusinessPrice;
    private LocalTime totalWaitingTime;
    private LocalTime totalFlightTime;
}
