package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeterinarianRepository extends JpaRepository<Veterinarian, String> {

    @Query(value = "SELECT u.user_id,u.role,u.status,u.username,u.email,u.full_name,v.vet_id,v.description,v.google_meet,v.phone,v.image,v.veterinarian_status FROM koi_vet_db.user u JOIN koi_vet_db.veterinarian v ON u.user_id = v.user_id", nativeQuery = true)

    List<Object[]> findAllVet();
}
