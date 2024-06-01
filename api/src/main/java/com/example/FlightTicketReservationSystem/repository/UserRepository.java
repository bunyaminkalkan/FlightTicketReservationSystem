package com.example.FlightTicketReservationSystem.repository;

import com.example.FlightTicketReservationSystem.model.User;
import org.springframework.data.couchbase.repository.CouchbaseRepository;

import java.util.Optional;

public interface UserRepository extends CouchbaseRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
