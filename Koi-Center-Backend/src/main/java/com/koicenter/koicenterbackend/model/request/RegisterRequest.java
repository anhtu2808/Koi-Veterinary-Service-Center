package com.koicenter.koicenterbackend.model.request;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class RegisterRequest {
    String email;
    String password;
    String username;
}