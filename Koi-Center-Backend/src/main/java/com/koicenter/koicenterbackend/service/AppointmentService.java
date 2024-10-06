package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.mapper.appointment.AppointmentMapper;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.AppointmentStatus;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.request.veterinarian.VetScheduleRequest;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.veterinarian.VetScheduleResponse;
import com.koicenter.koicenterbackend.model.response.veterinarian.VeterinarianResponse;
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
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
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
    VeterinarianRepository veterinarianRepository;
    AppointmentMapper appointmentMapper;
    VetScheduleService vetScheduleService;


    public List<AppointmentResponse> getAllAppointmentsByCustomerId(String customerId, String status) {
        List<Appointment> appointments = appointmentRepository.findAllByCustomerId(customerId);
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();


        for (Appointment appointment : appointments) {
            if (appointment.getStatus().name().equals(status) || status.equals("ALL")) {
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
        }
        return appointmentResponses;
    }


    public AppointmentResponse getAppointmentByAppointmentId(String appointmentId) {
        AppointmentResponse appointmentResponses ;
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
                .customerName(appointment.getCustomer().getUser().getFullName())
                .serviceName(appointment.getService().getServiceName())
                .serviceId(appointment.getService().getServiceId())
                .build();
        if(appointment.getVeterinarian()!=null){

            response.setVetId(appointment.getVeterinarian().getVetId());
            response.setVetName(veterinarianRepository.findByVetId(appointment.getVeterinarian().getVetId()).getUser().getFullName());
        }
        return response;
    }

    public List<AppointmentResponse> getAllAppointmentByVetId(String vetId, String status) {
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
            if (appointment.getStatus().name().equals(status) || status.equals("ALL")) {
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
        }
        return appointmentResponses;
    }

    //CREATE APPOINTMENT
    public AppointmentResponse createAppointment(AppointmentRequest appointmentRequest) {
        Customer customer = customerRepository.findByCustomerId(appointmentRequest.getCustomerId());
        Veterinarian veterinarian = null;
        if (!appointmentRequest.getVetId().equalsIgnoreCase("SKIP")) {
            veterinarian = veterinarianRepository.findByVetId(appointmentRequest.getVetId());
//            log.info("Veterian ID " + veterinarian.getVetId());
            int count = 0;
            if (appointmentRequest.getType().equals(AppointmentType.CENTER)) {
                count = 1;
            } else {
                count = 2;
            }
            VetScheduleRequest vetScheduleRequest = VetScheduleRequest.builder()
                    .vet_id(appointmentRequest.getVetId())
                    .endTime(appointmentRequest.getEndTime())
                    .startTime(appointmentRequest.getStartTime())
                    .date(appointmentRequest.getAppointmentDate())
                    .build();
            VetScheduleResponse vetScheduleResponse = vetScheduleService.SlotDateTime(vetScheduleRequest, count);
        }
        com.koicenter.koicenterbackend.model.entity.Service service = servicesRepository.findByServiceId(appointmentRequest.getServiceId());
        log.info("service ID " + service.getServiceId());


        Appointment appointment = new Appointment();
        appointment = appointmentMapper.toAppointment(appointmentRequest);
        appointment.setCustomer(customer);
        appointment.setVeterinarian(veterinarian);
        appointment.setService(service);
        appointmentRepository.save(appointment);
        AppointmentResponse appointmentResponse = appointmentMapper.toAppointmentResponse(appointment);
        appointmentResponse.setCustomerId(appointment.getCustomer().getCustomerId());
//        appointmentResponse.setVetId(appointment.getVeterinarian().getVetId());
        appointmentResponse.setServiceId(appointment.getService().getServiceId());
        log.info("appoimtID" + appointmentResponse.getAppointmentId());
        if (appointment.getVeterinarian() != null) {
            appointmentResponse.setVetId(appointment.getVeterinarian().getVetId());
        } else {
            appointmentResponse.setVetId("SKIP");
        }
        return appointmentResponse;
    }

    public AppointmentResponse updateAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentRequest.getAppointmentId());
        if (appointment != null) {
            LocalDate date = appointmentRequest.getAppointmentDate();
            LocalTime startTime = appointmentRequest.getStartTime();
            LocalTime endTime = appointmentRequest.getEndTime();
            String vetId = appointmentRequest.getVetId();
            int count = appointmentRequest.getType().equals(AppointmentType.CENTER) ? 1 : 2;
            Customer customer = customerRepository.findByCustomerId(appointmentRequest.getCustomerId());
            Veterinarian veterinarian = null;
            if (!appointmentRequest.getVetId().equalsIgnoreCase("SKIP")) {
                veterinarian = veterinarianRepository.findByVetId(appointmentRequest.getVetId());
            }
            com.koicenter.koicenterbackend.model.entity.Service service = servicesRepository.findByServiceId(appointmentRequest.getServiceId());
            if (appointment.getAppointmentDate().equals(date) && appointment.getStartTime().equals(startTime) && appointment.getEndTime().equals(endTime) && appointment.getVeterinarian().getVetId().equals(vetId)) {
                //NEU KHONG DOI THOI GIAN , KHONG DOI BAC SI
            } else if (appointment.getAppointmentDate().equals(date) && appointment.getStartTime().equals(startTime) && appointment.getEndTime().equals(endTime) && appointment.getVeterinarian().getVetId().equals("SKIP")) {
                VetScheduleRequest vetScheduleRequest1 = VetScheduleRequest.builder()
                        .vet_id(appointmentRequest.getVetId())
                        .startTime(appointmentRequest.getStartTime())
                        .endTime(appointmentRequest.getEndTime())
                        .date(appointmentRequest.getAppointmentDate())
                        .build();
                VetScheduleResponse vetScheduleResponse = vetScheduleService.SlotDateTime(vetScheduleRequest1, count);
            } else {
                VetScheduleRequest vetScheduleRequest = VetScheduleRequest.builder()
                        .vet_id(appointment.getVeterinarian().getVetId())
                        .endTime(appointment.getEndTime())
                        .startTime(appointment.getStartTime())
                        .date(appointment.getAppointmentDate())
                        .build();
                VetScheduleResponse vetScheduleResponse = vetScheduleService.SlotDateTime(vetScheduleRequest, -count);
                VetScheduleRequest vetScheduleRequest1 = VetScheduleRequest.builder()
                        .vet_id(appointmentRequest.getVetId())
                        .startTime(appointmentRequest.getStartTime())
                        .endTime(appointmentRequest.getEndTime())
                        .date(appointmentRequest.getAppointmentDate())
                        .build();
                VetScheduleResponse vetScheduleResponse1 = vetScheduleService.SlotDateTime(vetScheduleRequest1, count);
            }
            appointment = appointmentMapper.toAppointment(appointmentRequest);
            appointment.setCustomer(customer);
            appointment.setVeterinarian(veterinarian);
            appointment.setService(service);
            appointmentRepository.save(appointment);

            AppointmentResponse appointmentResponse = appointmentMapper.toAppointmentResponse(appointment);
            appointmentResponse.setCustomerId(appointment.getCustomer().getCustomerId());
            appointmentResponse.setVetId(appointment.getVeterinarian().getVetId());
            appointmentResponse.setServiceId(appointment.getService().getServiceId());
            return appointmentResponse;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "AppointmentById not found");
        }

    }

    public List<AppointmentResponse> getAllAppointments(String status) {
        List<Appointment> appointments;
        if (status.equalsIgnoreCase("ALL")) {
            appointments = appointmentRepository.findAll();
        } else {
            appointments = appointmentRepository.findByStatusOrderByCreatedAtDesc(AppointmentStatus.valueOf(status));
        }

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
                    .serviceName(appointment.getService().getServiceName())
                    .serviceId(appointment.getService().getServiceId())
                    .build();
            if (appointment.getVeterinarian() != null) {
                response.setVetId(appointment.getVeterinarian().getVetId());
            }
            appointmentResponses.add(response);

        }
        return appointmentResponses;
    }


}


