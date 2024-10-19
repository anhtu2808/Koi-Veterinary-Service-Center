package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.*;
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
    @Column(name = "faq_id")
    String faqId;
    @Lob
    @Column(name = "question", columnDefinition = "TEXT")
    String question;
    @Lob  // Sử dụng @Lob để lưu trữ kiểu TEXT
    @Column(name = "answer", columnDefinition = "TEXT")
    String answer;
    @Column(name = "created_at")
    LocalDate createdAt;
}
