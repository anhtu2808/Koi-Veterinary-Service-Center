package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PondRepository extends JpaRepository<Pond, String> {
    @Query(value = "SELECT * FROM pond WHERE customer_id = ?1", nativeQuery = true)
    List<Pond> getPondsByCustomerId(String customerId);
    List<Pond> findByCustomer_CustomerIdAndStatusTrue(String customerId);

}
