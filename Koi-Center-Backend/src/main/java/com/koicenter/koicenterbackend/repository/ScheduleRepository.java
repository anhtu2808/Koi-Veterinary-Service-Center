package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.VetSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<VetSchedule,String> {
//List<VetSchedule> findByVetId(String vet_id);
    List<VetSchedule> findByVeterinarianVetId(String veterinarianId);

}
