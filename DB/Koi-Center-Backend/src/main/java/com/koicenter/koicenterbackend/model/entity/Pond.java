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
public class Pond {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String pond_id;
    String status;
    float depth;
    float perimeter;
    float temperature;
    String notes;
    String image;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    Customer customer;

    @ManyToMany(mappedBy = "ponds")
    List<Appointment> appointments;
}
