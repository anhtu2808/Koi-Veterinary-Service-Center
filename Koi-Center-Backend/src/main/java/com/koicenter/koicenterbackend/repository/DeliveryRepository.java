package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, String> {
}
