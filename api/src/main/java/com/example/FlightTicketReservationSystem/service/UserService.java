package com.example.FlightTicketReservationSystem.service;

import com.example.FlightTicketReservationSystem.model.User;
import com.example.FlightTicketReservationSystem.repository.UserRepository;
import com.example.FlightTicketReservationSystem.request.LoginRegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User register(LoginRegisterRequest request) {
        User register = new User();
        register.setId(userRepository.count()+1);
        register.setEmail(request.getEmail());
        register.setPassword(request.getPassword());
        return userRepository.save(register);
    }

    public User login(LoginRegisterRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            return null;
        }
        if (user.getPassword().equals(request.getPassword())) {
            return user;
        }
        return null;
    }
}
