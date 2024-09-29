package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.LoggedOutToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoggedOutTokenRepository extends JpaRepository<LoggedOutToken, Long> {
    LoggedOutToken findByToken(String token);
}
