package com.example.FlightTicketReservationSystem.repository;

import com.example.FlightTicketReservationSystem.model.Ticket;
import org.springframework.data.couchbase.repository.CouchbaseRepository;

public interface TicketRepository extends CouchbaseRepository<Ticket, Long> {
}
