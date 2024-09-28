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
public class Koi {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "koi_id")
    String koiId;
    String breed;
    int age;
    float height;
    float weight;
    @Column(name = "health_status")
    String healthStatus;
    String notes;
    String image;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    @JsonIgnore
    Customer customer;


    @OneToMany(mappedBy = "koi")
    @JsonIgnore
    List<KoiTreatment> koiTreatments;

}
