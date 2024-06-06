package com.example.FlightTicketReservationSystem.request;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String email;
    private String firstName;
    private String lastName;
}
