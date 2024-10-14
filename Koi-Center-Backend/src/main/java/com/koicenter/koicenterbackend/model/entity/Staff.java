package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String staffId;
    String phone;
    String image;
    String status;
    double salary;
    String address;
    Date hireDate;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    User user;
}
