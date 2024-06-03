package com.example.FlightTicketReservationSystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final HttpStatus notFound = HttpStatus.NOT_FOUND;
    private final HttpStatus badRequest = HttpStatus.BAD_REQUEST;

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleUserNotFoundException(UserNotFoundException e) {
        return createExceptionResponse(e.getMessage(), notFound);
    }

    @ExceptionHandler(EmailOrPasswordIsNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleEmailOrPasswordIsNotValidException(EmailOrPasswordIsNotValidException e) {
        return createExceptionResponse(e.getMessage(), badRequest);
    }

    @ExceptionHandler(EmailAlreadyInUse.class)
    public ResponseEntity<ExceptionResponse> handleEmailAlreadyInUse(EmailAlreadyInUse e) {
        return createExceptionResponse(e.getMessage(), badRequest);
    }

    private ResponseEntity<ExceptionResponse> createExceptionResponse(String message, HttpStatus status) {
        ExceptionResponse response = new ExceptionResponse(
                message,
                status.value(),
                ZonedDateTime.now(ZoneId.of("Europe/Istanbul"))
        );
        return new ResponseEntity<>(response, status);
    }
}
