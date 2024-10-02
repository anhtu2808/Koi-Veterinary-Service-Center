package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeterinarianRepository extends JpaRepository<Veterinarian, String> {


    @Query("SELECT v FROM Veterinarian v WHERE v.user.userId = :userId")
    Veterinarian findByUserId(@Param("userId") String userId);


    @Query(value = "SELECT s.service_name FROM veterinarian_service vs " +
            "JOIN service s ON vs.service_id = s.service_id " +
            "WHERE vs.vet_id = :vetId", nativeQuery = true)
    List<String> findServiceNamesByVetId(@Param("vetId") String vetId);
    Veterinarian findByVetId(String vetId);

//    List<Veterinarian> findVeterinariansByServiceId(@Param("serviceId") String serviceId);

    List<Veterinarian> findByServices_ServiceId(String serviceId);
}
