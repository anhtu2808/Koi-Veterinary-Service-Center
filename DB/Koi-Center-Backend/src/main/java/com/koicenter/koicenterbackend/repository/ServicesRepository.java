package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicesRepository extends JpaRepository<Service, String> {
}
