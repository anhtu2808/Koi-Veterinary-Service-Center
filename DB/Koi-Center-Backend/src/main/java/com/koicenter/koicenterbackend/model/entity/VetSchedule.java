package com.koicenter.koicenterbackend.model.entity;

import com.koicenter.koicenterbackend.model.enums.StatusVetSchedule;
import com.koicenter.koicenterbackend.repository.ScheduleRepository;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class VetSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String schedule_id;

    LocalDate date;
    LocalTime start_time;
    LocalTime end_time;

    @Enumerated(EnumType.STRING)
    StatusVetSchedule status;

    @ManyToOne
    @JoinColumn(name = "vet_id", referencedColumnName = "vet_id")
    Veterinarian veterinarian;

}
