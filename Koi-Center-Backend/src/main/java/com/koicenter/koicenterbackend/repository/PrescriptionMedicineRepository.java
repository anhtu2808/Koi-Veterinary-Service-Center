package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Medicine;
import com.koicenter.koicenterbackend.model.entity.Prescription;
import com.koicenter.koicenterbackend.model.entity.PrescriptionMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionMedicineRepository extends JpaRepository<PrescriptionMedicine, String> {
    void deleteAllByMedicine(Medicine medicine);
    void deleteByPrescription_IdAndMedicine_MedicineId(String prescriptionId, String medicineId);
    PrescriptionMedicine findByPrescription_IdAndMedicine_MedicineId(String prescriptionId, String medicineId);
}
