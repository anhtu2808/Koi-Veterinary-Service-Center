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
    @Column(name = "vet_id")
    String vetId;
    boolean status;
    String description;
    @Column(name = "google_meet")
    String googleMeet;
    String phone;
    String image;
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
