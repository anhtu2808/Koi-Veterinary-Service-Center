package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.enums.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "select * from koi_vet_db.user where username = ?1", nativeQuery = true)
    User findByUsername(String username);
    User findByUserId(String userId);
    User findByEmail(String email);

    List<User> findByRole(Role role);
}

