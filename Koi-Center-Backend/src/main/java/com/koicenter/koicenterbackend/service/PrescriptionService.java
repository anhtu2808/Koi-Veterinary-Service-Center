package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Medicine;
import com.koicenter.koicenterbackend.model.entity.Prescription;
import com.koicenter.koicenterbackend.model.entity.PrescriptionMedicine;
import com.koicenter.koicenterbackend.model.request.prescription.PrescriptionMedicineRequest;
import com.koicenter.koicenterbackend.model.request.prescription.PrescriptionRequest;
import com.koicenter.koicenterbackend.repository.MedicineRepository;
import com.koicenter.koicenterbackend.repository.TreatmentMedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class PrescriptionService {
    private final TreatmentMedicineRepository prescriptionRepository;
    private final MedicineRepository medicineRepository;

    public Prescription createPrescription(PrescriptionRequest prescriptionRequest) {
        Prescription prescription = Prescription.builder()
                .name(prescriptionRequest.getName())
                .createdDate(ZonedDateTime.now())
                .note(prescriptionRequest.getNote())
                .prescriptionMedicines(new HashSet<>())
                .build();

        for (PrescriptionMedicineRequest request : prescriptionRequest.getPrescriptionMedicines()) {
            Medicine medicine = medicineRepository.findById(request.getMedicine().getMedicineId())
                    .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_EXITS.getCode(),
                            ErrorCode.MEDICINE_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));

            PrescriptionMedicine prescriptionMedicine = PrescriptionMedicine.builder()
                    .medicine(medicine)
                    .quantity(request.getQuantity())
                    .dosage(request.getDosage())
                    .prescription(prescription)
                    .build();

            prescription.getPrescriptionMedicines().add(prescriptionMedicine);
        }
        return prescriptionRepository.save(prescription);
    }

}

