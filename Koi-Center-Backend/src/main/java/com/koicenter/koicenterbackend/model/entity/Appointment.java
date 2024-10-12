package com.koicenter.koicenterbackend.model.entity;

import com.koicenter.koicenterbackend.model.enums.AppointmentStatus;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "appointment_id")
    String appointmentId;
    @Column(name = "appointment_date")
    LocalDate appointmentDate;
    @Enumerated(EnumType.STRING)
    AppointmentStatus status;
    @Column(name = "start_time")
    LocalTime startTime;
    @Column(name = "end_time")
    LocalTime endTime;
    String location;
    String result;
    float distance ;
    String code ;
    @Column(name = "created_at")
    ZonedDateTime createdAt;
    @Enumerated(EnumType.STRING)
    AppointmentType type;
    @Column(name = "deposited_money")
    float depositedMoney;

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

    @OneToMany(mappedBy = "appointment")
    List<PondTreatment> pondTreatments;

    @OneToMany(mappedBy = "appointment")
    List<KoiTreatment> koiTreatments;

}
