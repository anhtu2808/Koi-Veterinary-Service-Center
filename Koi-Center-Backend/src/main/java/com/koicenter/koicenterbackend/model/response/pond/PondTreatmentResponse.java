package com.koicenter.koicenterbackend.model.response.pond;

import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PondTreatmentResponse {
    private String pondTreatmentId;
    private String healthIssue;
    private String treatment;
    private String pondId;
    private String appointmentId;
    String prescriptionId;
    PondResponse pond;
}
