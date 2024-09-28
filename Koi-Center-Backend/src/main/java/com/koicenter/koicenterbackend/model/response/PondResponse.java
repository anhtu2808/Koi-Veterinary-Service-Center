package com.koicenter.koicenterbackend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PondResponse {
    String pondId;
    String status;
    float depth;
    float perimeter;
    float temperature;
    String notes;
    String image;
}
