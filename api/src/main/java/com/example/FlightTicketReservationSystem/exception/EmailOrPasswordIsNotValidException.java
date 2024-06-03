package com.example.FlightTicketReservationSystem.exception;

public class EmailOrPasswordIsNotValidException extends RuntimeException {
    public EmailOrPasswordIsNotValidException() {
        super("Email or password is not valid");
    }
}
