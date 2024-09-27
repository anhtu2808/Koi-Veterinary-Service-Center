package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "new_id")
    String newId;
    String title;
    String preview;
    String content;
    String img;
}
