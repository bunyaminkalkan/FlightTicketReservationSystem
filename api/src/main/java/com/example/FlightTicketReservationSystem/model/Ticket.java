package com.example.FlightTicketReservationSystem.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.Field;
import org.springframework.data.couchbase.repository.Collection;

@Document
@Collection("tickets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {

    @Id
    private Long id;

    @Field
    private User user;

    @Field
    private Flight flight;

    @Field
    private Integer seat;

    @Field
    private Integer price;
}
