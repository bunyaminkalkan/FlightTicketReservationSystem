package com.example.FlightTicketReservationSystem.exception;

public class SeatAlreadyIsSoldException extends RuntimeException{
    public SeatAlreadyIsSoldException() {
        super("Seat is already sold");
    }
}
