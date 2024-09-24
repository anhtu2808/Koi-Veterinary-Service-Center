package com.koicenter.koicenterbackend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koicenter.koicenterbackend.model.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    String user_id;
    String username;
    String password;
    String email;
    String full_name;
    Role role;
    boolean status;

}
