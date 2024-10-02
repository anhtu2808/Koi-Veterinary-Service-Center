package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PondTreatmentRepository extends JpaRepository<PondTreatment, String> {
}
