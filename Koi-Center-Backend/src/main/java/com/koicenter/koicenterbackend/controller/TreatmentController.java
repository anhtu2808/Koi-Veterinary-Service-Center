package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.request.koi.KoiTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.pond.PondTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.treament.TreamentRequest;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.koi.KoiTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.KoiTreatmentService;
import com.koicenter.koicenterbackend.service.PondTreatmentService;
import com.koicenter.koicenterbackend.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/treatments")
public class TreatmentController {
    @Autowired
    private PondTreatmentService pondTreatmentService;

    @Autowired
    private KoiTreatmentService koiTreatmentService;

    @Autowired
    private TreatmentService treatmentService;

    @PostMapping("/ponds")
    public ResponseEntity<ResponseObject> createPondTreatment(@RequestBody PondTreatmentRequest pondTreatmentRequest) {
        PondTreatmentResponse pondTreatmentResponse = pondTreatmentService.createPondTreatment(pondTreatmentRequest);
        return ResponseObject.APIRepsonse(200, "create successfully!", HttpStatus.CREATED, pondTreatmentResponse);
    }


    @PostMapping("/kois")
    public ResponseEntity<ResponseObject> createKoiTreatment(@RequestBody KoiTreatmentRequest koiTreatmentRequest) {
        KoiTreatmentResponse koiTreatmentResponse = koiTreatmentService.createKoiTreatment(koiTreatmentRequest);
        return ResponseObject.APIRepsonse(200, "create successfully!", HttpStatus.CREATED, koiTreatmentResponse);
    }
    @GetMapping("/ponds/{appointmentId}")
    public ResponseEntity<ResponseObject> getPondByAppointmentId(@PathVariable String appointmentId) {
        List<PondTreatmentResponse> list =  pondTreatmentService.getPondByAppointmentId(appointmentId);
        if(!list.isEmpty()){
            return ResponseObject.APIRepsonse(200, "Pond found successfully By Appointment ID ", HttpStatus.OK, list);
        }else{
            return ResponseObject.APIRepsonse(404, "Appointment not found", HttpStatus.NOT_FOUND,"");
        }
    }
    @GetMapping("/kois/{appointmentId}")
    public ResponseEntity<ResponseObject> getKoiByAppointmentId(@PathVariable String appointmentId) {
        List<KoiTreatmentResponse> list =  koiTreatmentService.getKoiByAppointmentId(appointmentId);
        if(!list.isEmpty()){
            return ResponseObject.APIRepsonse(200, "Pond found successfully By Appointment ID ", HttpStatus.OK, list);
        }else{
            return ResponseObject.APIRepsonse(404, "Appointment not found", HttpStatus.NOT_FOUND,"");
        }
    }

}
