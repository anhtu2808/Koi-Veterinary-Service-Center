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
public class PondTreatment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "pond_treatment_id")
    String pondTreatmentId;
    @Column(name = "health_issue")
    String healthIssue;
    String treatment;

    @ManyToOne
    @JoinColumn(name = "pond_id", referencedColumnName = "pond_id")
    Pond pond;

    @ManyToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "appointment_id")
    Appointment appointment;


}
