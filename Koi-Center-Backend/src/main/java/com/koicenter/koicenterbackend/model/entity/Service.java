package com.koicenter.koicenterbackend.model.entity;

import com.koicenter.koicenterbackend.model.enums.ServiceType;
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
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String service_id;
    String service_name;
    String description;
    float base_price;
    float delivery_price;
    float pond_price;
    float tank_price;
    @Enumerated(EnumType.STRING)
    ServiceType service_for;
    String image;

    @OneToMany(mappedBy = "service")
    List<Appointment> appointments;

    @ManyToMany
    @JoinTable(
            name = "veterinarian_service",
            joinColumns = @JoinColumn(name = "service_id"),
            inverseJoinColumns = @JoinColumn(name = "vet_id")
    )
    List<Veterinarian> veterinarians;
}
