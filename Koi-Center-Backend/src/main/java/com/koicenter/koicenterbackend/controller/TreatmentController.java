package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.request.koi.KoiTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.pond.PondTreatmentRequest;
import com.koicenter.koicenterbackend.model.response.KoiTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.PondTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.KoiTreatmentService;
import com.koicenter.koicenterbackend.service.PondTreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
