package com.example.FlightTicketReservationSystem.service;

import com.example.FlightTicketReservationSystem.exception.FlightNotFoundException;
import com.example.FlightTicketReservationSystem.exception.SeatAlreadyIsSoldException;
import com.example.FlightTicketReservationSystem.model.Flight;
import com.example.FlightTicketReservationSystem.model.Ticket;
import com.example.FlightTicketReservationSystem.repository.FlightRepository;
import com.example.FlightTicketReservationSystem.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final FlightRepository flightRepository;

    public void createTicket(Ticket request) {
        boolean isSold = ticketRepository.findAll().stream().anyMatch(ticket ->
                ticket.getFlightNumber().equals(request.getFlightNumber())
                        && ticket.getSeat().equals(request.getSeat()));
        if (isSold) {
            throw new SeatAlreadyIsSoldException();
        }
        Flight flight = flightRepository.findByFlightNumber(request.getFlightNumber()).orElseThrow(FlightNotFoundException::new);
        deleteSeat(request.getSeat(), flight);
        request.setId(ticketRepository.count() + 1);
        request.setPrice(request.getSeat() > 10 ? flight.getEconomyPrice() : flight.getBusinessPrice());
        ticketRepository.save(request);
        flightRepository.save(flight);
    }

    private void deleteSeat(Integer seat, Flight flight) {
        List<Integer> seatList;
        if (seat > 10) {
            seatList = flight.getEconomySeat();
            seatList.remove(seat);
            flight.setEconomySeat(seatList);
        } else {
            seatList = flight.getBusinessSeat();
            seatList.remove(seat);
            flight.setBusinessSeat(seatList);
        }
    }
}
