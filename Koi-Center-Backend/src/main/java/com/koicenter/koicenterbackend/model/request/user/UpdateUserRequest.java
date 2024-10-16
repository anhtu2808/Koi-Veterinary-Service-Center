package com.koicenter.koicenterbackend.model.request.user;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateUserRequest {
    String userId;
    String fullName;
    String email;
    String phoneNumber;
    String address;
    String image;
}

