package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import com.koicenter.koicenterbackend.model.request.pond.PondTreatmentRequest;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import com.koicenter.koicenterbackend.repository.PondRepository;
import com.koicenter.koicenterbackend.repository.PondTreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PondTreatmentService {

    private final PondTreatmentRepository pondTreatmentRepository;
    private final PondRepository pondRepository;
    private final AppointmentRepository appointmentRepository;

    public PondTreatmentResponse createPondTreatment(PondTreatmentRequest pondTreatmentRequest) {

        Optional<Pond> pondOptional = pondRepository.findById(pondTreatmentRequest.getPondId());
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(pondTreatmentRequest.getAppointmentId());

        if (pondOptional.isPresent() && appointmentOptional.isPresent()) {
            Pond pond = pondOptional.get();
            Appointment appointment = appointmentOptional.get();

            PondTreatment pondTreatment = PondTreatment.builder()
                    .pond(pond)
                    .appointment(appointment)
                    .healthIssue(pondTreatmentRequest.getHealthIssue())
                    .treatment(pondTreatmentRequest.getTreatment())
                    .build();

            PondTreatment savedPondTreatment = pondTreatmentRepository.save(pondTreatment);

            PondTreatmentResponse response = new PondTreatmentResponse();
            response.setPondTreatmentId(savedPondTreatment.getPondTreatmentId());
            response.setHealthIssue(savedPondTreatment.getHealthIssue());
            response.setTreatment(savedPondTreatment.getTreatment());
            response.setPondId(savedPondTreatment.getPond().getPondId());
            response.setAppointmentId(savedPondTreatment.getAppointment().getAppointmentId());

            return response;
        } else {
            throw new AppException(ErrorCode.POND_ID_OR_APPOINTMENT_ID_NOT_EXITS.getCode(),
                    ErrorCode.POND_ID_OR_APPOINTMENT_ID_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
