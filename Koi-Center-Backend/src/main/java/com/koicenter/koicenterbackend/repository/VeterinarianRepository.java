package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VeterinarianRepository extends JpaRepository<Veterinarian, String> {
}
