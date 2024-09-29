package com.koicenter.koicenterbackend.model.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class VeterinarianRequest {
    String vet_id;
    boolean status;
    String description;
    String google_meet;
    String phone;
}
