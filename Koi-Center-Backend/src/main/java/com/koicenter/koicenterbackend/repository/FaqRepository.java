package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaqRepository extends JpaRepository<Faq,String> {
}
