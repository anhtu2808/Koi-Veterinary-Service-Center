package com.koicenter.koicenterbackend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;

import com.koicenter.koicenterbackend.model.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    String user_id;
    String username;
    String email;
    String full_name;
    Role role;
    boolean status;

    Customer customer;
    Veterinarian veterinarian;

}
