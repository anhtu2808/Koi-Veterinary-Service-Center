package com.koicenter.koicenterbackend.model.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PondTreatmentResponse {
    String pondTreatmentId;
    private String healthIssue;
    private String treatment;
    private String pondId;
    private String appointmentId;
}
