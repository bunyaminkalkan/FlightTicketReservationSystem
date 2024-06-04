package com.example.FlightTicketReservationSystem.exception;

public class FlightNotFoundException extends RuntimeException{
    public FlightNotFoundException() {
        super("Flight not found");
    }
}
