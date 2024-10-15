package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.model.entity.Prescription;
import com.koicenter.koicenterbackend.model.entity.PrescriptionMedicine;
import com.koicenter.koicenterbackend.model.request.koi.KoiUpdateRequest;
import com.koicenter.koicenterbackend.model.request.prescription.PrescriptionRequest;
import com.koicenter.koicenterbackend.model.request.prescription.PrescriptionUpdateRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.koi.KoiResponse;
import com.koicenter.koicenterbackend.model.response.medicine.PrescriptionByIdResponse;
import com.koicenter.koicenterbackend.model.response.medicine.PrescriptionMedicineResponse;
import com.koicenter.koicenterbackend.model.response.medicine.PrescriptionResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondResponse;
import com.koicenter.koicenterbackend.service.PrescriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
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


    @DeleteMapping("/deletePrescriptionByPrescriptionId")
    public ResponseEntity<ResponseObject> deletePrescription(@RequestParam("prescriptionId") String prescriptionId) {
        try {
            prescriptionService.deletePrescriptionByPrescriptionId(prescriptionId);
            return ResponseObject.APIRepsonse(200, "Deleted presctiprion  successfully", HttpStatus.OK, null);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
    @DeleteMapping("/deletePrescriptionMedicineId")
    public ResponseEntity<ResponseObject> deleteMedicine(@RequestParam String prescriptionId , @RequestParam String medicineId) {
        try {
            prescriptionService.deletePrescriptionMedicine(prescriptionId, medicineId);
            return ResponseObject.APIRepsonse(200, "Deleted presctiprion medicine successfully", HttpStatus.OK, null);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }


    @GetMapping
    public ResponseEntity<ResponseObject> getPrescriptionsByAppointmentId(
            @RequestParam("appointmentId") String appointmentId) {
        try {
            List<PrescriptionResponse> prescriptions = prescriptionService.getPrescriptionsByAppointmentId(appointmentId);
            return ResponseObject.APIRepsonse(200, "Found prescriptions successfully", HttpStatus.OK, prescriptions);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, "No prescriptions found", HttpStatus.NOT_FOUND, null);
        }
    }


    @GetMapping("/{prescriptionId}")
    public ResponseEntity<ResponseObject> getPrescriptionById(@PathVariable("prescriptionId") String prescriptionId) {
        try {
            PrescriptionByIdResponse pre = prescriptionService.getPrescriptionById(prescriptionId);
            return ResponseObject.APIRepsonse(200, "Found prescription successfully", HttpStatus.OK, pre);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PutMapping("/{prescriptionId}")
    public ResponseEntity<ResponseObject> updatePrescription(@PathVariable("prescriptionId") String prescriptionId, @Valid @RequestBody PrescriptionUpdateRequest request) {
        try {
            PrescriptionResponse updatePrescription = prescriptionService.updatePrescription(prescriptionId, request);
            return ResponseObject.APIRepsonse(200, "Update success", HttpStatus.OK, updatePrescription);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }


    @GetMapping("/prescription-medicines/{prescriptionMedicineId}")
    public ResponseEntity<ResponseObject> getPrescriptionMedicineById(@PathVariable("prescriptionMedicineId") String prescriptionMedicineId) {
        try {
            PrescriptionMedicineResponse prescriptionMedicineResponse = prescriptionService.getPrescriptionMedicineById(prescriptionMedicineId);
            return ResponseObject.APIRepsonse(200, "Found prescription medicine successfully", HttpStatus.OK, prescriptionMedicineResponse);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }


}

