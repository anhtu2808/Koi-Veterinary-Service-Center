package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.enums.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,String> {

    @Query(value = "SELECT * FROM koi_vet_db.appointment WHERE customer_id = :customerId", nativeQuery = true)
    List<Appointment> findAllByCustomerId(@Param("customerId") String customerId);


    @Query(value = "SELECT * FROM koi_vet_db.appointment WHERE appointment_id = :appointmentId", nativeQuery = true)
    Appointment findAppointmentById(@Param("appointmentId") String appointmentId);


    @Query(value = "SELECT * FROM koi_vet_db.appointment WHERE vet_id = :vetId", nativeQuery = true)
    List<Appointment> findAllByVetId(@Param("vetId") String vetId);

    List<Appointment> findByCustomer_CustomerIdOrderByCreatedAtDesc(String customerId);
    List<Appointment> findByVeterinarian_VetIdOrderByCreatedAtDesc(String vetId);
    Page<Appointment> findByStatusOrderByCreatedAtDesc(AppointmentStatus status, Pageable pageable);

    List<Appointment> findAllByService_ServiceId(String serviceId);


    List<Appointment> findAllByOrderByCreatedAtDesc();
    List<Appointment> findByCreatedAtBetween( ZonedDateTime starDate , ZonedDateTime endDate);


    @Query(value = "SELECT * FROM appointment WHERE MONTH(created_at) = :month", nativeQuery = true)
    List<Appointment> findByCreatedAtMonth(@Param("month") int month);
    @Query(value = "SELECT * FROM appointment WHERE YEAR(created_at) = :year", nativeQuery = true)
    List<Appointment> findByCreatedAtYear(@Param("year") int year);
    @Query(value = "SELECT * FROM appointment WHERE Date(created_at) = :date", nativeQuery = true)
    List<Appointment> findByCreatedAtDate(@Param("date") int date);

    List<Appointment> findByVeterinarian_VetIdAndAppointmentDate(String vetId, LocalDate date);

    @Query(value = "SELECT * FROM appointment WHERE Date(created_at) >= startTime and  Date(created_at) <= startTime",nativeQuery = true)
    List<Appointment>findByStartTimeAndEndTimeByDate(@Param("starTime") String starTime,@Param("endTime") String endTime);
}
