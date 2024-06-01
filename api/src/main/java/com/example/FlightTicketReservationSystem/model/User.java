package com.example.FlightTicketReservationSystem.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.Field;
import org.springframework.data.couchbase.repository.Collection;

@Document
@Collection("users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private Long id;

    @Field
    private String email;

    @Field
    private String password;

    @Field
    private String firstName;

    @Field
    private String lastName;
}
