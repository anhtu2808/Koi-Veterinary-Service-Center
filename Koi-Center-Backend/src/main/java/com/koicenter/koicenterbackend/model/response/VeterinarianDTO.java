package com.koicenter.koicenterbackend.model.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VeterinarianDTO {
    String vetId;
    String description;
    String googleMeet;
    String image;
    String phone;
    String veterinarianStatus;
    String status;
}
