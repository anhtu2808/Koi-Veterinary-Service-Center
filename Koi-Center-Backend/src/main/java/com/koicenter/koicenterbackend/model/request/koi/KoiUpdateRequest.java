package com.koicenter.koicenterbackend.model.request.koi;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class KoiUpdateRequest {
    String id;
    String breed;
    int age;
    float length;
    float weight;
    boolean status;
    String notes;
    String image;
}
