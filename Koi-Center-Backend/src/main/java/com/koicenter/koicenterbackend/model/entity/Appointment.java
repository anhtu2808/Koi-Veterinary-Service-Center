package com.koicenter.koicenterbackend.model.entity;

import com.koicenter.koicenterbackend.model.enums.AppointmentStatus;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String appointment_id;
    LocalDate appointment_date;
    @Enumerated(EnumType.STRING)
    AppointmentStatus status;
    LocalTime start_time;
    LocalTime end_time;
    String location;
    String result;
    LocalDateTime created_at;
    @Enumerated(EnumType.STRING)
    AppointmentType type;
    float deposited_money;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    Customer customer;

    @ManyToOne
    @JoinColumn(name = "vet_id", referencedColumnName = "vet_id")
    Veterinarian veterinarian;

    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL)
    Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "service_id")
    Service service;

    @ManyToMany
    @JoinTable(
            name = "appointment_pond",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns = @JoinColumn(name = "pond_id")
    )
    List<Pond> ponds;

    @ManyToMany
    @JoinTable(
            name = "appointment_koi",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns = @JoinColumn(name = "koi_id")
    )
    List<Koi> kois;

    @OneToMany(mappedBy = "appointment")
    List<Prescription> prescriptions;
}
