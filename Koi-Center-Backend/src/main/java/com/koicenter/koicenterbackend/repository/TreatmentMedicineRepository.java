package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.TreatmentMedicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentMedicineRepository extends JpaRepository<TreatmentMedicine, String> {
}
