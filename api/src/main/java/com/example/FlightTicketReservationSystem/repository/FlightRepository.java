package com.example.FlightTicketReservationSystem.repository;

import com.example.FlightTicketReservationSystem.model.Flight;
import org.springframework.data.couchbase.repository.CouchbaseRepository;

import java.util.List;
import java.util.Optional;

public interface FlightRepository extends CouchbaseRepository<Flight, Long> {
    Optional<List<Flight>> findByDepartureLocation(String departureLocation);
    Optional<List<Flight>> findByArrivalLocation(String arrivalLocation);
    Optional<Flight> findByFlightNumber(String flightNumber);
}
