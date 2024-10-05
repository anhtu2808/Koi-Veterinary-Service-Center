package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.KoiTreatment;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KoiTreatmentRepository extends JpaRepository<KoiTreatment, String> {
    List<KoiTreatment> findKoiTreatmentsByAppointment_AppointmentId(String appointmentId);
    KoiTreatment findByAppointment_AppointmentIdAndKoi_KoiId(String appointmentId, String koiId);

}
