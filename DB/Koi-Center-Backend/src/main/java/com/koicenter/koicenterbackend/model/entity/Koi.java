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
public class Koi {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String koi_id;
    String breed;
    int age;
    float height;
    float weight;
    String health_status;
    String notes;
    String image;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    Customer customer;

    @ManyToMany(mappedBy = "kois")
    List<Appointment> appointments;

}
