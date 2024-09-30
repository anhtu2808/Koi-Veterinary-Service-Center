package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentMedicineRepository extends JpaRepository<Prescription, String> {
}
