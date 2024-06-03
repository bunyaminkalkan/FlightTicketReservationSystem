package com.example.FlightTicketReservationSystem.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
public class ExceptionResponse {
    private final String message;
    private final int status;
    private final ZonedDateTime timestamp;
}