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
public class PrescriptionMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
     String id ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
     Prescription prescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id")
     Medicine medicine;

     int quantity;
     String dosage;
}
