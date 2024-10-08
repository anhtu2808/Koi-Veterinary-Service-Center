package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.mapper.PondMapper;
import com.koicenter.koicenterbackend.mapper.PondTreatmentMapper;
import com.koicenter.koicenterbackend.mapper.appointment.AppointmentMapper;
import com.koicenter.koicenterbackend.mapper.koi.KoiTreatmentMapper;
import com.koicenter.koicenterbackend.model.entity.KoiTreatment;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import com.koicenter.koicenterbackend.model.entity.Prescription;
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
    PrescriptionRepository prescriptionRepository;
    ServicesRepository servicesRepository ;

    public <T> List<T> createAppointments(List<String> selected, AppointmentRequest appointmentRequest) {
        AppointmentResponse appointmentResponse =  appointmentService.createAppointment(appointmentRequest);
        log.info("AppointmentID "+ appointmentResponse.getAppointmentId());

        List<T> treatmentResponseList = new ArrayList<>();
        if (selected.isEmpty()){
            treatmentResponseList.add((T)appointmentResponse);
        }else{
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
        }
        return treatmentResponseList;
    }
    public PondTreatmentResponse updatePondTreatment(PondTreatmentRequest pondTreatmentRequest){

        PondTreatment pondTreatment = pondTreatmentRepository.findById(pondTreatmentRequest.getPondTreatmentId()).orElseThrow(()->
                new RuntimeException("PondTreatment not found"));

        if (pondTreatmentRequest.getPrescription_id()!=null){
            Prescription prescription =prescriptionRepository.findById(pondTreatmentRequest.getPrescription_id()).orElseThrow(() -> new RuntimeException("Not Found Precepstion "));
            pondTreatment.setPrescription(prescription);
        }else{
            pondTreatment.setPrescription(null);
        }
        if (pondTreatmentRequest.getHealthIssue()!=null){
            pondTreatment.setHealthIssue(pondTreatmentRequest.getHealthIssue());
        }
        if(pondTreatmentRequest.getTreatment()!=null) {
            pondTreatment.setTreatment(pondTreatmentRequest.getTreatment());
        }
        pondTreatmentRepository.save(pondTreatment);
        PondTreatmentResponse pondTreatmentResponse = new PondTreatmentResponse();
        pondTreatmentResponse = pondTreatmentMapper.toPondTreatmentResponse(pondTreatment);
        return  pondTreatmentResponse ;
    }
    public KoiTreatmentResponse updateKoiTreatment(KoiTreatmentRequest koiTreatmentRequest){

        KoiTreatment koiTreatment = koiTreatmentRepository.findById(koiTreatmentRequest.getKoiTreatmentId()).orElseThrow(
                () -> new RuntimeException("Not Found KoiTreatment ")
        );
        if (koiTreatmentRequest.getPrescription_id()!=null){
            Prescription prescription =prescriptionRepository.findById(koiTreatmentRequest.getPrescription_id()).orElseThrow(() -> new RuntimeException("Not Found Precepstion "));
            koiTreatment.setPrescription(prescription);
        }else{
            koiTreatment.setPrescription(null);
        }
        if (koiTreatmentRequest.getHealthIssue()!=null){
            koiTreatment.setHealthIssue(koiTreatmentRequest.getHealthIssue());
        }
        if(koiTreatmentRequest.getTreatment()!=null) {
            koiTreatment.setTreatment(koiTreatmentRequest.getTreatment());
        }
        KoiTreatmentResponse koiTreatmentResponse = new KoiTreatmentResponse();
        koiTreatmentResponse = koiTreatmentMapper.toKoiTreatmentResponse(koiTreatmentRepository.save(koiTreatment));
//        koiTreatmentResponse.prescription
        return  koiTreatmentResponse ;
    }
}
