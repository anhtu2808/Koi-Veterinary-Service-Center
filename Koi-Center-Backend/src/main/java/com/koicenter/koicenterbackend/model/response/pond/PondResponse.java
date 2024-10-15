package com.koicenter.koicenterbackend.model.response.pond;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PondResponse {
    String pondId;
    boolean status;
    float depth;
    float perimeter;
    float temperature;
    String notes;
    String image;
    String customerId;
    String waterQuality; // Chất lượng nước
    String filterSystem; // Hệ thống lọc
}
