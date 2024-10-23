package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.entity.KoiTreatment;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import com.koicenter.koicenterbackend.model.response.koi.KoiResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KoiTreatmentRepository extends JpaRepository<KoiTreatment, String> {
    @Query(value = "")
    List<KoiTreatment> findKoiTreatmentsByAppointment_AppointmentId(String appointmentId);
    KoiTreatment findKoiTreatmentByKoiTreatmentId(String koiTreatmentId);
    int countKoiTreatmentByAppointment_AppointmentId(String appointmentId);
}
