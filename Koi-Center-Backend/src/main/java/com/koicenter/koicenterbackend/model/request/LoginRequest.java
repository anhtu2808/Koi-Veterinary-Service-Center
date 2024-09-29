package com.koicenter.koicenterbackend.model.request;


import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.pl.NIP;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {
    @NotNull
    String username;
    @NotNull
    String password;




}
