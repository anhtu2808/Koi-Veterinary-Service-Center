package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Medicine;
import com.koicenter.koicenterbackend.model.entity.Prescription;
import com.koicenter.koicenterbackend.model.entity.PrescriptionMedicine;
import com.koicenter.koicenterbackend.model.entity.VetSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, String> {

}
