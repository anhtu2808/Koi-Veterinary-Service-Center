package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeterinarianRepository extends JpaRepository<Veterinarian, String> {

    @Query("SELECT v FROM Veterinarian v WHERE v.user.userId = :userId")
    Veterinarian findByUserId(@Param("userId") String userId);



}
