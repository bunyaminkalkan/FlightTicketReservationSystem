package com.example.FlightTicketReservationSystem.response;

import com.example.FlightTicketReservationSystem.model.Flight;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class ConnectingFlightResponse {
    private String flightNumber1;
    private String flightNumber2;
    private String planeNumber1;
    private String planeNumber2;
    private String departureLocation1;
    private String arrivalLocation1;
    private String departureLocation2;
    private String arrivalLocation2;
    private LocalDateTime departureDate1;
    private LocalDateTime arrivalDate1;
    private LocalDateTime departureDate2;
    private LocalDateTime arrivalDate2;
    private Integer economySeatCount;
    private Integer businessSeatCount;
    private Integer totalEconomyPrice;
    private Integer totalBusinessPrice;
    private LocalTime totalWaitingTime;
    private LocalTime totalFlightTime;

    public ConnectingFlightResponse(Flight flight1, Flight flight2) {
        this.flightNumber1 = flight1.getFlightNumber();
        this.flightNumber2 = flight2.getFlightNumber();
        this.planeNumber1 = flight1.getPlaneNumber();
        this.planeNumber2 = flight2.getPlaneNumber();
        this.departureLocation1 = flight1.getDepartureLocation();
        this.arrivalLocation1 = flight1.getArrivalLocation();
        this.departureLocation2 = flight2.getDepartureLocation();
        this.arrivalLocation2 = flight2.getArrivalLocation();
        this.departureDate1 = flight1.getDepartureDate();
        this.arrivalDate1 = flight1.getArrivalDate();
        this.departureDate2 = flight2.getDepartureDate();
        this.arrivalDate2 = flight2.getArrivalDate();
        this.economySeatCount = chooseMinusSeat(flight1.getEconomySeat().size(), flight2.getEconomySeat().size());
        this.businessSeatCount = chooseMinusSeat(flight1.getBusinessSeat().size(), flight2.getBusinessSeat().size());
        this.totalEconomyPrice = flight1.getEconomyPrice() + flight2.getEconomyPrice();
        this.totalBusinessPrice = flight1.getBusinessPrice() + flight2.getBusinessPrice();
        this.totalFlightTime = addLocalTimes(flight1.getFlightTime(), flight2.getFlightTime());
        this.totalWaitingTime = subtractLocalDateTimes(flight2.getDepartureDate(), flight1.getArrivalDate());
    }

    private LocalTime addLocalTimes(LocalTime time1, LocalTime time2) {
        int totalMinutes = time1.getHour() * 60 + time1.getMinute() + time2.getHour() * 60 + time2.getMinute();
        int hours = totalMinutes / 60;
        int minutes = totalMinutes % 60;

        return LocalTime.of(hours % 24, minutes);
    }

    private LocalTime subtractLocalDateTimes(LocalDateTime dateTime1, LocalDateTime dateTime2) {
        Duration duration = Duration.between(dateTime2, dateTime1);

        long totalSeconds = duration.getSeconds();
        int hours = (int) (totalSeconds / 3600);
        int minutes = (int) ((totalSeconds % 3600) / 60);
        int seconds = (int) (totalSeconds % 60);

        return LocalTime.of(hours % 24, minutes, seconds);
    }

    private Integer chooseMinusSeat(int seatCount, int seatCount2) {
        return Math.min(seatCount, seatCount2);
    }
}
