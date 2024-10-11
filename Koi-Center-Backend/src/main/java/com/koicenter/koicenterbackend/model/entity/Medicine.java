package com.koicenter.koicenterbackend.model.entity;

import com.koicenter.koicenterbackend.model.enums.MedUnit;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "medicine_id")
    String medicineId;
    String name;
    String description;
    @Enumerated(EnumType.STRING)
    MedUnit medUnit;


    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PrescriptionMedicine> prescriptionMedicines = new HashSet<>();
}
