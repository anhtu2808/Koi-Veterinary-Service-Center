package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import com.koicenter.koicenterbackend.repository.CustomerRepository;
import com.koicenter.koicenterbackend.repository.ServicesRepository;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;
    CustomerRepository customerRepository;
    ServicesRepository servicesRepository;
    VeterinarianRepository veterinarianRepository ;

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
                    .type(appointment.getType())
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
                    .type(appointment.getType())
                    .customerId(appointment.getCustomer().getCustomerId())
                    .customerName(appointment.getCustomer().getUser().getFullName())
                    .serviceId(appointment.getService().getServiceId())
                    .serviceName(appointment.getService().getServiceName())
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
                .type(appointment.getType())
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
                    .type(appointment.getType())
                    .customerId(appointment.getCustomer().getCustomerId())
                    .serviceName(appointment.getService().getServiceName())
                    .customerName(appointment.getCustomer().getUser().getFullName())
                    .serviceId(appointment.getService().getServiceId())
                    .vetId(appointment.getVeterinarian().getVetId())
                    .build();

            appointmentResponses.add(response);
        }
        return appointmentResponses;
    }
    //CREATE APPOINTMENT
    public void createAppointment ( AppointmentResponse appointmentResponse){
        Customer customer = customerRepository.findByCustomerId(appointmentResponse.getCustomerId());
        Veterinarian veterinarian =  veterinarianRepository.findByVetId(appointmentResponse.getVetId());
        log.info("Veterian ID "+ veterinarian.getVetId());
        com.koicenter.koicenterbackend.model.entity.Service service = servicesRepository.findByServiceId(appointmentResponse.getServiceId());

        Appointment appointment = new Appointment();

    appointment.setAppointmentDate(appointmentResponse.getAppointmentDate());
    appointment.setCreatedAt(appointmentResponse.getCreatedAt());
    appointment.setEndTime(appointmentResponse.getEndTime());
    appointment.setStatus(appointmentResponse.getStatus());
    appointment.setType(appointmentResponse.getType());
    appointment.setLocation(appointmentResponse.getLocation());
    appointment.setDepositedMoney(appointment.getDepositedMoney());
    appointment.setResult(appointmentResponse.getResult());
    appointment.setStartTime(appointmentResponse.getStartTime());
    appointment.setType(appointment.getType());
    appointment.setCustomer(customer);
    appointment.setVeterinarian(veterinarian);
    appointment.setService(service);
    appointmentRepository.save(appointment);
    }
    public boolean updateAppointment (AppointmentRequest appointmentRequest){
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentRequest.getAppointmentId());
        Customer customer = customerRepository.findByCustomerId(appointmentRequest.getCustomerId());
        Veterinarian veterinarian =  veterinarianRepository.findByVetId(appointmentRequest.getVetId());
        log.info("Veterian ID "+ veterinarian.getVetId());
        com.koicenter.koicenterbackend.model.entity.Service service = servicesRepository.findByServiceId(appointmentRequest.getServiceId());

        appointment.setAppointmentDate(appointmentRequest.getAppointmentDate());
        appointment.setCreatedAt(appointmentRequest.getCreatedAt());
        appointment.setEndTime(appointmentRequest.getEndTime());
        appointment.setStatus(appointmentRequest.getStatus());
        appointment.setType(appointmentRequest.getType());
        appointment.setLocation(appointmentRequest.getLocation());
        appointment.setDepositedMoney(appointmentRequest.getDepositedMoney());
        appointment.setResult(appointmentRequest.getResult());
        appointment.setStartTime(appointmentRequest.getStartTime());
        appointment.setType(appointmentRequest.getType());
        appointment.setCustomer(customer);
        appointment.setVeterinarian(veterinarian);
        appointment.setService(service);

        appointmentRepository.save(appointment);
        return true ;
    }
}


