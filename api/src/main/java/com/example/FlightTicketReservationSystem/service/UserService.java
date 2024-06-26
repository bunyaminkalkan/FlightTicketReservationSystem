package com.example.FlightTicketReservationSystem.service;

import com.example.FlightTicketReservationSystem.exception.EmailAlreadyInUse;
import com.example.FlightTicketReservationSystem.exception.EmailOrPasswordIsNotValidException;
import com.example.FlightTicketReservationSystem.exception.UserNotFoundException;
import com.example.FlightTicketReservationSystem.model.Role;
import com.example.FlightTicketReservationSystem.model.User;
import com.example.FlightTicketReservationSystem.repository.UserRepository;
import com.example.FlightTicketReservationSystem.request.LoginRegisterRequest;
import com.example.FlightTicketReservationSystem.request.UpdateUserRequest;
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
        register.setRole(Role.USER);
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

    public UserResponse update(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            user.setEmail(request.getEmail());
        }
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        return new UserResponse(userRepository.save(user));
    }
}
