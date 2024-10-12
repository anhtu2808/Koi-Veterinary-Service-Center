package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.entity.Pond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KoiRepository extends JpaRepository<Koi, String> {
    @Query(value = "SELECT * FROM koi WHERE customer_id = ?1", nativeQuery = true)
    List<Koi> getKoiByCustomerId(String customerId);
    Koi findKoiByKoiId(String koiId);
    List<Koi> findByCustomer_CustomerIdAndStatusTrue(String customerId);
}
