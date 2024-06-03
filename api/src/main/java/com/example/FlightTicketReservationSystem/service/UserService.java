package com.example.FlightTicketReservationSystem.service;

import com.example.FlightTicketReservationSystem.exception.EmailAlreadyInUse;
import com.example.FlightTicketReservationSystem.exception.EmailOrPasswordIsNotValidException;
import com.example.FlightTicketReservationSystem.exception.UserNotFoundException;
import com.example.FlightTicketReservationSystem.model.User;
import com.example.FlightTicketReservationSystem.repository.UserRepository;
import com.example.FlightTicketReservationSystem.request.LoginRegisterRequest;
import com.example.FlightTicketReservationSystem.response.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse register(LoginRegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyInUse();
        }
        User register = new User();
        register.setId(userRepository.count()+1);
        register.setEmail(request.getEmail());
        register.setPassword(request.getPassword());
        userRepository.save(register);
        return new UserResponse(register);
    }

    public UserResponse login(LoginRegisterRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(UserNotFoundException::new);
        if (user.getPassword().equals(request.getPassword())) {
            return new UserResponse(user);
        } else {
            throw new EmailOrPasswordIsNotValidException();
        }
    }
}
