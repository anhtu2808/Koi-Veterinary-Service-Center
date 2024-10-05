package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.mapper.PondMapper;
import com.koicenter.koicenterbackend.mapper.PondTreatmentMapper;
import com.koicenter.koicenterbackend.mapper.appointment.AppointmentMapper;
import com.koicenter.koicenterbackend.mapper.koi.KoiTreatmentMapper;
import com.koicenter.koicenterbackend.model.entity.KoiTreatment;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.request.koi.KoiTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.pond.PondTreatmentRequest;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.koi.KoiTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import com.koicenter.koicenterbackend.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TreatmentService {
    KoiTreatmentRepository koiTreatmentRepository;
    PondTreatmentRepository pondTreatmentRepository;
    PondRepository pondRepository;
    AppointmentRepository appointmentRepository;
    PondTreatmentMapper pondTreatmentMapper;
    KoiTreatmentMapper koiTreatmentMapper;
    PondMapper pondMapper;
    AppointmentMapper appointmentMapper;
    PondTreatmentService pondTreatmentService ;
    AppointmentService appointmentService;
    KoiRepository koiRepository ;
    KoiTreatmentService koiTreatmentService ;
    public <T> List<T> createAppointments(List<String> selected, AppointmentRequest appointmentRequest) {
        log.info("AppointmentID "+ appointmentRequest.getAppointmentId());
        log.info("vetId "+ appointmentRequest.getVetId());
        AppointmentResponse appointmentResponse =  appointmentService.createAppointment(appointmentRequest);
        List<T> treatmentResponseList = new ArrayList<>();
        for (String select : selected) {
            if(pondRepository.findById(select).isPresent()) {
                PondTreatmentRequest pondTreatmentRequest = new PondTreatmentRequest();
                pondTreatmentRequest.setPondId(select);
                pondTreatmentRequest.setAppointmentId(appointmentResponse.getAppointmentId());
                pondTreatmentRequest.setHealthIssue("");
                pondTreatmentRequest.setTreatment("");
                treatmentResponseList.add((T) pondTreatmentService.createPondTreatment(pondTreatmentRequest));
            }
            else if (koiRepository.findById(select).isPresent()) {
                KoiTreatmentRequest koiTreatmentRequest = new KoiTreatmentRequest();
                koiTreatmentRequest.setKoiId(select);
                koiTreatmentRequest.setAppointmentId(appointmentResponse.getAppointmentId());
                koiTreatmentRequest.setHealthIssue("");
                koiTreatmentRequest.setTreatment("");
                treatmentResponseList.add((T) koiTreatmentService.createKoiTreatment(koiTreatmentRequest));
            }
        }
        return treatmentResponseList;
    }
    public PondTreatmentResponse updatePondTreament (PondTreatmentRequest pondTreatmentRequest){
        PondTreatment pondTreatment = pondTreatmentRepository.findByAppointment_AppointmentIdAndPond_PondId(pondTreatmentRequest.getAppointmentId(), pondTreatmentRequest.getPondId());
        pondTreatment.setHealthIssue(pondTreatmentRequest.getHealthIssue());
        pondTreatment.setTreatment(pondTreatmentRequest.getTreatment());
        pondTreatmentRepository.save(pondTreatment);
        PondTreatmentResponse pondTreatmentResponse = new PondTreatmentResponse();
        pondTreatmentResponse = pondTreatmentMapper.toPondTreatmentResponse(pondTreatment);
        return  pondTreatmentResponse ;
    }
    public KoiTreatmentResponse updateKoiTreament (KoiTreatmentRequest koiTreatmentRequest){
        KoiTreatment koiTreatment = koiTreatmentRepository.findByAppointment_AppointmentIdAndKoi_KoiId(koiTreatmentRequest.getAppointmentId(), koiTreatmentRequest.getKoiId());
        koiTreatment.setHealthIssue(koiTreatmentRequest.getHealthIssue());
        koiTreatment.setTreatment(koiTreatmentRequest.getTreatment());
        koiTreatmentRepository.save(koiTreatment);
        KoiTreatmentResponse koiTreatmentResponse = new KoiTreatmentResponse();
        koiTreatmentResponse = koiTreatmentMapper.toKoiTreatmentResponse(koiTreatment);
        return  koiTreatmentResponse ;
    }
}
