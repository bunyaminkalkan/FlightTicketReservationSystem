package com.example.FlightTicketReservationSystem.controller;

import com.example.FlightTicketReservationSystem.model.Ticket;
import com.example.FlightTicketReservationSystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody Ticket request) {
        ticketService.createTicket(request);
        return ResponseEntity.ok().build();
    }
}
