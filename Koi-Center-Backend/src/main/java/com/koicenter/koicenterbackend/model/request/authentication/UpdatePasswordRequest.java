package com.koicenter.koicenterbackend.model.request.authentication;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdatePasswordRequest {
    String userId;
    String currentPassword;
    String newPassword;
}
