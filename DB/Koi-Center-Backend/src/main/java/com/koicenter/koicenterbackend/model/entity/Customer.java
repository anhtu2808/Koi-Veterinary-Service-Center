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
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String customer_id;
    String address;
    String phone;
    String image;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    User user;

    @OneToMany(mappedBy = "customer")
    List<Koi> kois;

    @OneToMany(mappedBy = "customer")
    List<Pond> ponds;

    @OneToMany(mappedBy = "customer")
    List<Appointment> appointments;
}
