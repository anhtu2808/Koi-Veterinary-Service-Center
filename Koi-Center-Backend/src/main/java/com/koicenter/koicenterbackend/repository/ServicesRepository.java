package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Service;
import com.koicenter.koicenterbackend.model.enums.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicesRepository extends JpaRepository<Service, String> {
    List<Service> findByServiceForNot(ServiceType serviceType);
    List<Service> findByServiceFor(ServiceType serviceType);
}
