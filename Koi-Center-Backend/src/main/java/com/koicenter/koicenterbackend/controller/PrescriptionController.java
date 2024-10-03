package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.entity.Prescription;
import com.koicenter.koicenterbackend.model.entity.PrescriptionMedicine;
import com.koicenter.koicenterbackend.model.request.prescription.PrescriptionRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.medicine.PrescriptionResponse;
import com.koicenter.koicenterbackend.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/prescriptions")
@RequiredArgsConstructor

public class PrescriptionController {
    private final PrescriptionService prescriptionService;

    //create don thuoc
    @PostMapping()
    public ResponseEntity<ResponseObject> createPrescription(@RequestBody PrescriptionRequest prescriptionRequest) {
        if (prescriptionRequest.getName() == null || prescriptionRequest.getName().isEmpty() ||
                prescriptionRequest.getPrescriptionMedicines() == null || prescriptionRequest.getPrescriptionMedicines().isEmpty()) {
            return ResponseObject.APIRepsonse(400, "Invalid input data", HttpStatus.BAD_REQUEST, null);
        }
        PrescriptionResponse createdPrescription = prescriptionService.createPrescription(prescriptionRequest);
        return ResponseObject.APIRepsonse(200, "Create prescription success", HttpStatus.OK, createdPrescription);
    }
}
