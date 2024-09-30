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
public class KoiTreatment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "koi_treatment_id")
    String koiTreatmentId;
    @Column(name = "health_issue")
    String healthIssue;
    String treatment;

    @ManyToOne
    @JoinColumn(name = "koi_id", referencedColumnName = "koi_id")
    Koi koi;

    @ManyToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "appointment_id")
            
    Appointment appointment;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

}
