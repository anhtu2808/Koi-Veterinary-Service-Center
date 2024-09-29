package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,String> {

    @Query(value = "SELECT * FROM koi_vet_db.appointment WHERE customer_id = :customerId", nativeQuery = true)
    List<Appointment> findAllByCustomerId(@Param("customerId") String customerId);


    @Query(value = "SELECT * FROM koi_vet_db.appointment WHERE appointment_id = :appointmentId", nativeQuery = true)
    Appointment findAppointmentById(@Param("appointmentId") String appointmentId);


    @Query(value = "SELECT * FROM koi_vet_db.appointment WHERE vet_id = :vetId", nativeQuery = true)
    List<Appointment> findAllByVetId(@Param("vetId") String vetId);

}
