package com.koicenter.koicenterbackend.model.response.koi;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class KoiResponse {
    String koiId;
    String breed;
    int age;
    float length;

    float weight;
    String healthStatus;
    String notes;
    String image;
}
