package com.example.FlightTicketReservationSystem.repository;

import com.example.FlightTicketReservationSystem.model.Flight;
import org.springframework.data.couchbase.repository.CouchbaseRepository;

public interface FlightRepository extends CouchbaseRepository<Flight, Long> {
}
