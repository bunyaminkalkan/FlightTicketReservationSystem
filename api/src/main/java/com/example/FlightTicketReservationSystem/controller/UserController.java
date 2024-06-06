package com.example.FlightTicketReservationSystem.controller;

import com.example.FlightTicketReservationSystem.request.LoginRegisterRequest;
import com.example.FlightTicketReservationSystem.request.UpdateUserRequest;
import com.example.FlightTicketReservationSystem.response.UserResponse;
import com.example.FlightTicketReservationSystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody LoginRegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRegisterRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable Long id, @RequestBody UpdateUserRequest request ) {
        return ResponseEntity.ok(userService.update(id, request));
    }
}
