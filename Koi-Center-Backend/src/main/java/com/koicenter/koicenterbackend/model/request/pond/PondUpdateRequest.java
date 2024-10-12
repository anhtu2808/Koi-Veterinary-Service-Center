package com.koicenter.koicenterbackend.model.request.pond;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PondUpdateRequest {
    boolean status;
    //@Min(value = 0, message = "Depth must be greater than or equal to 0")
    float depth;
    //@Min(value = 0, message = "Perimeter must be greater than or equal to 0")
    float perimeter;
    float temperature;
    String notes;
    String image;
    String waterQuality; // Chất lượng nước
    String filterSystem;
}
