package com.koicenter.koicenterbackend.model.entity;

import com.koicenter.koicenterbackend.model.enums.VeterinarianStatus;
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

    @Enumerated(EnumType.STRING)
    VeterinarianStatus VeterinarianStatus;


    String description;
    @Column(name = "google_meet")
    String googleMeet;
    String phone;
    String image;
     String Vetstatus;
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
