package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.KoiTreatment;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import org.apache.tomcat.util.http.fileupload.util.LimitedInputStream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PondTreatmentRepository extends JpaRepository<PondTreatment, String> {
List<PondTreatment> findPondTreatmentsByAppointment_AppointmentId(String appointmentId);
    PondTreatment findByAppointment_AppointmentIdAndPond_PondId(String appointmentId, String pondId);
    PondTreatment findPondTreatmentByPondTreatmentId(String pondTreatmentId);
    int countPondTreatmentByAppointment_AppointmentId(String appointmentId);
}
