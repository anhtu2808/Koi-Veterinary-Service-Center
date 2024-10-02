package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreatmentMedicineRepository extends JpaRepository<Prescription, String> {
}
