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
    @Column(columnDefinition = "BIT")
    boolean status;
    float depth;
    float perimeter;
    float temperature;
    @Lob
    @Column(name = "notes", columnDefinition = "TEXT")
    String notes;
    String image;
    String waterQuality; // Chất lượng nước
    String filterSystem; // Hệ thống lọc
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    Customer customer;

    @OneToMany(mappedBy = "pond")
    List<PondTreatment> pondTreatments;
}
