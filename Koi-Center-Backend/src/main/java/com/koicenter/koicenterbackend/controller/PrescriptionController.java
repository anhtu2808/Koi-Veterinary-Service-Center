package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.exception.AppException;
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


    @DeleteMapping("/{prescriptionMedicineId}")
    public ResponseEntity<ResponseObject> deleteMedicine(@PathVariable("prescriptionMedicineId") String prescriptionMedicineId) {
        try {
            prescriptionService.deletePrescriptionMedicine(prescriptionMedicineId);
            return ResponseObject.APIRepsonse(200, "Deleted presctiprion medicine successfully", HttpStatus.OK, null);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}

