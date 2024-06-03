package com.example.FlightTicketReservationSystem.exception;

public class EmailAlreadyInUse extends RuntimeException {
    public EmailAlreadyInUse() {
        super("Email already in use");
    }
}
