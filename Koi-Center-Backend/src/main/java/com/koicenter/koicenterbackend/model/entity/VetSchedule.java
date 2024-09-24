package com.koicenter.koicenterbackend.model.entity;

import com.koicenter.koicenterbackend.model.enums.StatusVetSchedule;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class VetSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "schedule_id")
    String scheduleId;
    LocalDate date;
    @Column(name = "start_time")
    LocalTime startTime;
    @Column(name = "end_time")
    LocalTime endTime;
    int customerBookingCount;

    @Enumerated(EnumType.STRING)
    StatusVetSchedule status;

    @ManyToOne
    @JoinColumn(name = "vet_id", referencedColumnName = "vet_id")
    Veterinarian veterinarian;

}
