package com.koicenter.koicenterbackend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name = "pond_id")
    String pondId;
    String status;
    float depth;
    float perimeter;
    float temperature;
    @Lob
    String notes;
    String image;
    String waterQuality; // Chất lượng nước
    String filterSystem; // Hệ thống lọc
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    @JsonIgnore
    Customer customer;

    @OneToMany(mappedBy = "pond")
    @JsonIgnore
    List<PondTreatment> pondTreatments;
}
