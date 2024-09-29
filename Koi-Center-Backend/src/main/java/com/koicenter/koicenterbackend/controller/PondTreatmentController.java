package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.request.PondTreatmentRequest;
import com.koicenter.koicenterbackend.model.response.PondTreatmentResponse;
import com.koicenter.koicenterbackend.service.PondService;
import com.koicenter.koicenterbackend.service.PondTreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pondTreatment")
public class PondTreatmentController {

    @Autowired
    private PondTreatmentService pondTreatmentService;

    @PostMapping("/create")
    public ResponseEntity<PondTreatmentResponse> createPondTreatment(@RequestBody PondTreatmentRequest pondTreatmentRequest) {
        PondTreatmentResponse response = pondTreatmentService.createPondTreatment(pondTreatmentRequest);
        return ResponseEntity.ok(response);
    }
}
