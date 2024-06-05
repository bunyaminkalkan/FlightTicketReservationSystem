package com.example.FlightTicketReservationSystem.repository;

import com.example.FlightTicketReservationSystem.model.Flight;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.data.couchbase.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FlightRepository extends CouchbaseRepository<Flight, Long> {
    Optional<List<Flight>> findByArrivalLocation(String arrivalLocation);
    Optional<Flight> findByFlightNumber(String flightNumber);

    @Query("#{#n1ql.selectEntity} WHERE departureLocation = $1 AND MILLIS_TO_STR(departureDate, '1111-11-11') = $2")
    Optional<List<Flight>> findByDepartureLocationAndDepartureDate(String departureLocation, String departureDay);
}
