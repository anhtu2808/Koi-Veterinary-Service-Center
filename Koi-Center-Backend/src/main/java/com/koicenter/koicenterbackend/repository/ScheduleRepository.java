package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.VetSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<VetSchedule,String> {

}
