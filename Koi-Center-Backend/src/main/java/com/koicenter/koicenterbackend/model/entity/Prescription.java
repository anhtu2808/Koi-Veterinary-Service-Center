package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    ZonedDateTime createdDate;
    String note;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PrescriptionMedicine> prescriptionMedicines = new HashSet<>();
}
