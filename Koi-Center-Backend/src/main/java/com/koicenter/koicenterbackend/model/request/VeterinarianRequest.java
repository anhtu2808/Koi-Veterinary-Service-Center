package com.koicenter.koicenterbackend.model.request;

import com.koicenter.koicenterbackend.model.entity.User;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data

public class VeterinarianRequest {
    String vet_id;
    String status;
    String description;
    String google_meet;
    String phone;
    String image;
    List<String> Service ;

    UserRequest userRequest ;
}
