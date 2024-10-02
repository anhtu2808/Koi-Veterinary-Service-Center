package com.koicenter.koicenterbackend.model.request.user;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class UserRequest {
    String email;
    String password;
    String username;
    String fullname;
    String address;
    String phone;
    boolean status;
    String image;
}
