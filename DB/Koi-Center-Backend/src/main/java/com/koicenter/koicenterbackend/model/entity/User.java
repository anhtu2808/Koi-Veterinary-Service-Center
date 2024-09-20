package com.koicenter.koicenterbackend.model.entity;


import com.koicenter.koicenterbackend.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String user_id;
    String username;
    String full_name;
    String password;
    String email;
    @Enumerated(EnumType.STRING)
    Role role;
    boolean status;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    Customer customer;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    Veterinarian veterinarian;
}
