package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity

public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String faq_id;
    String question;
    String answer;
    LocalDate created_at;
}
