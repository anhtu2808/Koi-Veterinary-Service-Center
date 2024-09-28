package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.response.AppointmentResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
                    .appointmentDate(appointment.getAppointmentDate())
                    .endTime(appointment.getEndTime())
                    .status(appointment.getStatus())
                    .location(String.valueOf(appointment.getLocation()))
                    .createdAt(appointment.getCreatedAt())
                    .depositedMoney(appointment.getDepositedMoney())
                    .location(String.valueOf(appointment.getLocation()))
                    .result(String.valueOf(appointment.getResult()))
                    .startTime(appointment.getStartTime())
                    .status(appointment.getStatus())
                    .type(String.valueOf(appointment.getType()))
                    .customerId(appointment.getCustomer().getCustomerId())
                    .serviceId(appointment.getService().getServiceId())
                    .vetId(appointment.getVeterinarian().getVetId())
                    .build();

            appointmentResponses.add(response);
        }
        return appointmentResponses;
    }


    public List<AppointmentResponse> getAllAppointmentsByCustomerId(String customerId) {
        List<Appointment> appointments = appointmentRepository.findAllByCustomerId(customerId);
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();


        for (Appointment appointment : appointments) {

            AppointmentResponse response = AppointmentResponse.builder()
                    .appointmentId(appointment.getAppointmentId())
                    .appointmentDate(appointment.getAppointmentDate())
                    .endTime(appointment.getEndTime())
                    .status(appointment.getStatus())
                    .location(String.valueOf(appointment.getLocation()))
                    .createdAt(appointment.getCreatedAt())
                    .depositedMoney(appointment.getDepositedMoney())
                    .location(String.valueOf(appointment.getLocation()))
                    .result(String.valueOf(appointment.getResult()))
                    .startTime(appointment.getStartTime())
                    .status(appointment.getStatus())
                    .type(String.valueOf(appointment.getType()))
                    .customerId(appointment.getCustomer().getCustomerId())
                    .serviceId(appointment.getService().getServiceId())
                    .vetId(appointment.getVeterinarian().getVetId())
                    .build();

            appointmentResponses.add(response);
        }
        return appointmentResponses;
    }


    public AppointmentResponse getAppointmentByAppointmentId(String appointmentId) {
        AppointmentResponse appointmentResponses = new AppointmentResponse();
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);

        AppointmentResponse response = AppointmentResponse.builder()
                .appointmentId(appointment.getAppointmentId())
                .appointmentDate(appointment.getAppointmentDate())
                .endTime(appointment.getEndTime())
                .status(appointment.getStatus())
                .location(String.valueOf(appointment.getLocation()))
                .createdAt(appointment.getCreatedAt())
                .depositedMoney(appointment.getDepositedMoney())
                .location(String.valueOf(appointment.getLocation()))
                .result(String.valueOf(appointment.getResult()))
                .startTime(appointment.getStartTime())
                .status(appointment.getStatus())
                .type(String.valueOf(appointment.getType()))
                .customerId(appointment.getCustomer().getCustomerId())
                .serviceId(appointment.getService().getServiceId())
                .vetId(appointment.getVeterinarian().getVetId())
                .build();
        return response;
    }

    public List<AppointmentResponse> getAllAppointmentByVetId(String vetId) {
        List<Appointment> appointments = appointmentRepository.findAllByVetId(vetId);

        List<AppointmentResponse> appointmentResponses = new ArrayList<>();

        if (appointments == null) { // Thêm kiểm tra null
            throw new AppException(ErrorCode.SERVICE_NOT_EXITS.getCode(), "No appointments found", HttpStatus.NOT_FOUND);
        }

        appointments.sort(Comparator
                .comparing(Appointment::getAppointmentDate)
                .thenComparing(Appointment::getCreatedAt)
                .reversed());

        for (Appointment appointment : appointments) {
            AppointmentResponse response = AppointmentResponse.builder()
                    .appointmentId(appointment.getAppointmentId())
                    .appointmentDate(appointment.getAppointmentDate())
                    .endTime(appointment.getEndTime())
                    .status(appointment.getStatus())
                    .location(String.valueOf(appointment.getLocation()))
                    .createdAt(appointment.getCreatedAt())
                    .depositedMoney(appointment.getDepositedMoney())
                    .location(String.valueOf(appointment.getLocation()))
                    .result(String.valueOf(appointment.getResult()))
                    .startTime(appointment.getStartTime())
                    .status(appointment.getStatus())
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


