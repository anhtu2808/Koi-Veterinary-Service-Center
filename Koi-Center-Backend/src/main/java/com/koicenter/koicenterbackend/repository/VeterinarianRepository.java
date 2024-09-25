package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeterinarianRepository extends JpaRepository<Veterinarian, String> {
    @Query(value = "SELECT * FROM Koi_Vetenarian_Service_Center.user u JOIN Koi_Vetenarian_Service_Center.veterinarian v ON u.user_id = v.user_id", nativeQuery = true)
    List findAllVet();
}
