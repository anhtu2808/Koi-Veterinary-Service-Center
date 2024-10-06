package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreatmentMedicineRepository extends JpaRepository<Prescription, String> {
    List<Prescription> findByAppointmentId(String appointmentId);
}
