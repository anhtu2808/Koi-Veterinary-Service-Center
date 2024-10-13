package com.koicenter.koicenterbackend.model.response.user;

import com.fasterxml.jackson.annotation.JsonInclude;

import com.koicenter.koicenterbackend.model.enums.Role;
import com.koicenter.koicenterbackend.model.response.staff.StaffDTO;
import com.koicenter.koicenterbackend.model.response.veterinarian.VeterinarianDTO;
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
    String fullName;
    Role role;
    boolean status;
    CustomerDTO customer;
    VeterinarianDTO veterinarian;
    StaffDTO staff;

}
