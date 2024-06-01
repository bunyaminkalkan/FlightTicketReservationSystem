package com.example.FlightTicketReservationSystem.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.Field;
import org.springframework.data.couchbase.repository.Collection;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Document
@Collection("flights")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Flight {

    @Id
    private Long id;

    @Field
    private String flightNumber;

    @Field
    private String planeNumber;

    @Field
    private List<Integer> businessSeat;

    @Field
    private Integer businessPrice;

    @Field
    private List<Integer> economySeat;

    @Field
    private Integer economyPrice;

    @Field
    private String departureLocation;

    @Field
    private LocalDateTime departureDate;

    @Field
    private String arrivalLocation;

    @Field
    private LocalDateTime arrivalDate;

    @Field
    private LocalTime flightTime;
}
