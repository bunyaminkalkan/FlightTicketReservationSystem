package com.example.FlightTicketReservationSystem.response;

import com.example.FlightTicketReservationSystem.model.User;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;

    public UserResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
    }
}
