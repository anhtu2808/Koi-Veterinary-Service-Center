package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
    Staff findByUser_UserId(String userId);
}
