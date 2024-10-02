package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.KoiTreatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KoiTreatmentRepository extends JpaRepository<KoiTreatment, String> {
}
