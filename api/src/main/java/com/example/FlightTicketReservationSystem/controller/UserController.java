package com.example.FlightTicketReservationSystem.controller;

import com.example.FlightTicketReservationSystem.model.User;
import com.example.FlightTicketReservationSystem.request.LoginRegisterRequest;
import com.example.FlightTicketReservationSystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody LoginRegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRegisterRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }
}
