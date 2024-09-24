package com.koicenter.koicenterbackend.model.entity;


import com.koicenter.koicenterbackend.model.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String user_id;
    @NotNull

    String username;
    @NotNull
    String password;
    String email;
    String full_name;
    @Enumerated(EnumType.STRING)
    Role role;
    boolean status;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    Customer customer;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    Veterinarian veterinarian;

}
