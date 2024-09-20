package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Veterinarian {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String vet_id;
    boolean status;
    String description;
    String google_meet;
    String phone;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    User user;

    @OneToMany(mappedBy = "veterinarian")
    List<VetSchedule> vetSchedules;

    @OneToMany(mappedBy = "veterinarian")
    List<Appointment> appointments;

    @ManyToMany(mappedBy = "veterinarians")
    List<Service> services;
}
