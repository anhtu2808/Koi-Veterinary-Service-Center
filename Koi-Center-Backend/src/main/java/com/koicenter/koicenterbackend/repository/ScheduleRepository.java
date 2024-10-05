package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.VetSchedule;
import com.koicenter.koicenterbackend.model.response.veterinarian.VetScheduleResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<VetSchedule,String> {
    //List<VetSchedule> findByVetId(String vet_id);
    List<VetSchedule> findByVeterinarianVetId(String veterinarianId);

    @Query( value = "SELECT v FROM VetSchedule v  WHERE v.veterinarian.vetId = :vetId" +
            "                             AND     v.startTime = :startTime" +
            "                             AND     v.endTime = :endTime" +
            "                             AND     v.date =:date")
    VetSchedule findVetSchedule(@Param("vetId") String vetId, @Param("startTime") LocalTime startTime, @Param("endTime") LocalTime endTime, @Param("date") LocalDate date);

}
