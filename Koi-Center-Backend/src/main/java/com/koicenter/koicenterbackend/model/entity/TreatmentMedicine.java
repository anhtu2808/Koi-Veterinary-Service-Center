package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class TreatmentMedicine {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "treatment_id")
    String treatmentId;
    @Column(name = "medicine_name")
    String medicineName;
    String dosage;
    String duration;
    LocalDateTime created_date;
    String note;

    @ManyToOne
    @JoinColumn(name = "koi_treatment_id", referencedColumnName = "koi_treatment_id")
    KoiTreatment koiTreatment;

    @ManyToOne
    @JoinColumn(name = "pond_treatment_id", referencedColumnName = "pond_treatment_id")
    PondTreatment pondTreatment;

    @ManyToOne
    @JoinColumn(name = "medicine_id", referencedColumnName = "medicine_id")
    Medicine medicine;
}
