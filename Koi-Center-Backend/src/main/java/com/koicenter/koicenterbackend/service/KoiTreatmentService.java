package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.mapper.koi.KoiMapper;
import com.koicenter.koicenterbackend.mapper.koi.KoiTreatmentMapper;
import com.koicenter.koicenterbackend.model.entity.*;
import com.koicenter.koicenterbackend.model.request.koi.KoiTreatmentRequest;
import com.koicenter.koicenterbackend.model.response.koi.KoiTreatmentResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import com.koicenter.koicenterbackend.repository.KoiRepository;
import com.koicenter.koicenterbackend.repository.KoiTreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KoiTreatmentService {
    private final KoiTreatmentRepository koiTreatmentRepository;
    private final KoiRepository koiRepository;
    private final AppointmentRepository appointmentRepository;
    private final KoiMapper koiMapper ;
    private final KoiTreatmentMapper koiTreatmentMapper ;
    public KoiTreatmentResponse createKoiTreatment(KoiTreatmentRequest koiTreatmentRequest) {

        Optional<Koi> pondOptional = koiRepository.findById(koiTreatmentRequest.getKoiId());
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(koiTreatmentRequest.getAppointmentId());

        if (pondOptional.isPresent() && appointmentOptional.isPresent()) {
            Koi koi = pondOptional.get();
            Appointment appointment = appointmentOptional.get();

            KoiTreatment koiTreatment = KoiTreatment.builder()
                    .koi(koi)
                    .appointment(appointment)
                    .healthIssue(koiTreatmentRequest.getHealthIssue())
                    .treatment(koiTreatmentRequest.getTreatment())
                    .build();

            KoiTreatment savedKoiTreatment = koiTreatmentRepository.save(koiTreatment);

            KoiTreatmentResponse response = new KoiTreatmentResponse();
            response.setKoiTreatmentId(savedKoiTreatment.getKoiTreatmentId());
            response.setHealthIssue(savedKoiTreatment.getHealthIssue());
            response.setTreatment(savedKoiTreatment.getTreatment());
            response.setKoiId(savedKoiTreatment.getKoi().getKoiId());
            response.setAppointmentId(savedKoiTreatment.getAppointment().getAppointmentId());

            return response;
        } else {
            throw new AppException(ErrorCode.KOI_ID_OR_APPOINTMENT_ID_NOT_EXITS.getCode(),
                    ErrorCode.KOI_ID_OR_APPOINTMENT_ID_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    public List<KoiTreatmentResponse> getKoiByAppointmentId(String appointmentId) {
        List<KoiTreatmentResponse>  koiTreatmentResponseList = new ArrayList<>();
        List<KoiTreatment> koiTreatments = new ArrayList<>();
        koiTreatments =koiTreatmentRepository.findKoiTreatmentsByAppointment_AppointmentId(appointmentId);
        for (KoiTreatment koiTreatment : koiTreatments) {
            KoiTreatmentResponse koiTreatmentResponse = new KoiTreatmentResponse();
            koiTreatmentResponse =koiTreatmentMapper.toKoiTreatmentResponse(koiTreatment);
            koiTreatmentResponse.setKoi(koiMapper.toKoiResponse(koiTreatment.getKoi()));


            koiTreatmentResponseList.add( koiTreatmentResponse );
        }

        return koiTreatmentResponseList ;
    }
}
