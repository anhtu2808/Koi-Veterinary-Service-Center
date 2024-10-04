package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Medicine;
import com.koicenter.koicenterbackend.model.entity.Prescription;
import com.koicenter.koicenterbackend.model.entity.PrescriptionMedicine;
import com.koicenter.koicenterbackend.model.request.prescription.PrescriptionMedicineRequest;
import com.koicenter.koicenterbackend.model.request.prescription.PrescriptionRequest;
import com.koicenter.koicenterbackend.model.response.medicine.MedicineResponse;
import com.koicenter.koicenterbackend.model.response.medicine.PrescriptionMedicineResponse;
import com.koicenter.koicenterbackend.model.response.medicine.PrescriptionResponse;
import com.koicenter.koicenterbackend.repository.MedicineRepository;
import com.koicenter.koicenterbackend.repository.PrescriptionMedicineRepository;
import com.koicenter.koicenterbackend.repository.TreatmentMedicineRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrescriptionService {
    private final TreatmentMedicineRepository prescriptionRepository;
    private final MedicineRepository medicineRepository;
    private final PrescriptionMedicineRepository prescriptionMedicineRepository;

    @Transactional
    public PrescriptionResponse createPrescription(PrescriptionRequest prescriptionRequest) {
        // Tạo Prescription từ PrescriptionRequest
        Prescription prescription = Prescription.builder()
                .name(prescriptionRequest.getName())
                .createdDate(prescriptionRequest.getCreatedDate())
                .note(prescriptionRequest.getNote())
                .prescriptionMedicines(new HashSet<>())
                .build();

        Set<PrescriptionMedicine> prescriptionMedicines = new HashSet<>();

        prescriptionRequest.getPrescriptionMedicines().forEach(prescriptionMedicineRequest -> {

            Medicine medicine = medicineRepository.findById(prescriptionMedicineRequest.getMedicine().getMedicineId())
                    .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_EXITS.getCode(),
                            ErrorCode.MEDICINE_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));

            PrescriptionMedicine prescriptionMedicine = PrescriptionMedicine.builder()
                    .prescription(prescription)
                    .medicine(medicine)
                    .quantity(prescriptionMedicineRequest.getQuantity())
                    .dosage(prescriptionMedicineRequest.getDosage())
                    .build();

            prescriptionMedicines.add(prescriptionMedicine);
        });

        prescription.setPrescriptionMedicines(prescriptionMedicines);

        prescriptionRepository.save(prescription);


        PrescriptionResponse prescriptionResponse = new PrescriptionResponse();

        prescriptionResponse.setId(prescription.getId());
        prescriptionResponse.setName(prescriptionRequest.getName());
        prescriptionResponse.setCreatedDate(prescription.getCreatedDate());
        prescriptionResponse.setNote(prescription.getNote());

        Set<PrescriptionMedicineResponse> prescriptionMedicineResponses = new HashSet<>();

        for(PrescriptionMedicine prescriptionMedicine: prescriptionMedicines) {
            PrescriptionMedicineResponse prescriptionMedicineResponse = new PrescriptionMedicineResponse();

            Medicine medicine = prescriptionMedicine.getMedicine();
            MedicineResponse medicineResponse = new MedicineResponse();
            medicineResponse.setMedicineId(medicine.getMedicineId());
            medicineResponse.setName(medicine.getName());
            medicineResponse.setDescription(medicine.getDescription());

            prescriptionMedicineResponse.setMedicine(medicineResponse);
            prescriptionMedicineResponse.setQuantity(prescriptionMedicine.getQuantity());
            prescriptionMedicineResponse.setDosage(prescriptionMedicine.getDosage());
            prescriptionMedicineResponses.add(prescriptionMedicineResponse);
        }

        prescriptionResponse.setPrescriptionMedicines(prescriptionMedicineResponses);

        return prescriptionResponse;
    }

    public void deletePrescriptionMedicine(String id){
        PrescriptionMedicine prescriptionMedicine = prescriptionMedicineRepository.findById(id).orElseThrow(() ->
                new AppException(ErrorCode.PRESCRIPTION_MEDICINE_NOT_EXITS.getCode(),
                        ErrorCode.PRESCRIPTION_MEDICINE_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));
        prescriptionMedicineRepository.delete(prescriptionMedicine);

    }

}

