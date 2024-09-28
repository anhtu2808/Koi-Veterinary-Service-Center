package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.response.AppointmentResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;


    public List<AppointmentResponse> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();


        appointments.sort(Comparator
                .comparing(Appointment::getAppointmentDate)
                .thenComparing(Appointment::getCreatedAt)
                .reversed());


        for (Appointment appointment : appointments) {

            AppointmentResponse response = AppointmentResponse.builder()
                    .appointmentId(appointment.getAppointmentId())
                    .appointmentDate(String.valueOf(appointment.getAppointmentDate()))
                    .endTime(String.valueOf(appointment.getEndTime()))
                    .status(String.valueOf(appointment.getStatus()))
                    .location(String.valueOf(appointment.getLocation()))
                    .createdAt(String.valueOf(appointment.getCreatedAt()))
                    .depositedMoney(appointment.getDepositedMoney())
                    .location(String.valueOf(appointment.getLocation()))
                    .result(String.valueOf(appointment.getResult()))
                    .startTime(String.valueOf(appointment.getStartTime()))
                    .status(String.valueOf(appointment.getStatus()))
                    .type(String.valueOf(appointment.getType()))
                    .customerId(appointment.getCustomer().getCustomerId())
                    .serviceId(appointment.getService().getServiceId())
                    .vetId(appointment.getVeterinarian().getVetId())
                    .build();

            appointmentResponses.add(response);
        }
        return appointmentResponses;
    }


}


