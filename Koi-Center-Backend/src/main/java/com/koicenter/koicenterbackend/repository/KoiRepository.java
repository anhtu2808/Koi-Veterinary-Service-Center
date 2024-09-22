package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Koi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KoiRepository extends JpaRepository<Koi, String> {
}
