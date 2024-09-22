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
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String prescription_id;
    String medicine_name;
    String dosage;
    String duration;
    LocalDateTime created_date;
    String note;

    @ManyToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "appointment_id")
    Appointment appointment;

    @ManyToOne
    @JoinColumn(name = "medicine_id", referencedColumnName = "medicine_id")
    Medicine medicine;
}
