package com.example.FlightTicketReservationSystem.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UpdateFlightRequest {
    private String flightNumber;

    private String planeNumber;

    private Integer businessPrice;

    private Integer economyPrice;

    private String departureLocation;

    private LocalDateTime departureDate;

    private String arrivalLocation;

    private LocalDateTime arrivalDate;
}
