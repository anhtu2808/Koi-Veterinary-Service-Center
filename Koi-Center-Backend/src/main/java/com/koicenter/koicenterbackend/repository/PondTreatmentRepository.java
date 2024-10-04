package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import org.apache.tomcat.util.http.fileupload.util.LimitedInputStream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PondTreatmentRepository extends JpaRepository<PondTreatment, String> {
    //    List<PondTreatment> findPondTreatmentByAppointmentId(String appointmentId);
List<PondTreatment> findPondTreatmentsByAppointment_AppointmentId(String appointmentId);
}
