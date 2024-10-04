package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.mapper.PondMapper;
import com.koicenter.koicenterbackend.mapper.PondTreatmentMapper;
import com.koicenter.koicenterbackend.mapper.appointment.AppointmentMapper;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.request.pond.PondTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.pond.SelectedPond;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import com.koicenter.koicenterbackend.repository.PondRepository;
import com.koicenter.koicenterbackend.repository.PondTreatmentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TreatmentService {

    PondTreatmentRepository pondTreatmentRepository;
    PondRepository pondRepository;
    AppointmentRepository appointmentRepository;
    PondTreatmentMapper pondTreatmentMapper;
    PondMapper pondMapper;
    AppointmentMapper appointmentMapper;
    AppointmentService appointmentService;


}
