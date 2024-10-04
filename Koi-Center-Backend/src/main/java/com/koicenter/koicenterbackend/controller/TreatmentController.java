package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.request.koi.KoiTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.pond.PondTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.veterinarian.VetScheduleRequest;
import com.koicenter.koicenterbackend.model.response.koi.KoiTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.veterinarian.VeterinarianResponse;
import com.koicenter.koicenterbackend.service.KoiTreatmentService;
import com.koicenter.koicenterbackend.service.PondTreatmentService;
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
    @GetMapping("/{appointmentId}")
    public ResponseEntity<ResponseObject> getPondByAppointmentId(@PathVariable String appointmentId) {
        List<PondTreatmentResponse> list =  pondTreatmentService.getPondByAppointmentId(appointmentId);
        if(!list.isEmpty()){
            return ResponseObject.APIRepsonse(200, "Pond found successfully By Appointment ID ", HttpStatus.OK, list);
        }else{
            return ResponseObject.APIRepsonse(404, "Appointment not found", HttpStatus.NOT_FOUND,"");
        }
    }
}
