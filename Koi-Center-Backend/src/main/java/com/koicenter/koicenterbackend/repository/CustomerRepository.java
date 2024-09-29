package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Customer findByCustomerId(String customerId);
}
