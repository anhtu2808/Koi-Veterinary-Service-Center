package com.koicenter.koicenterbackend.model.response.koi;

import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class KoiTreatmentResponse {
    String koiTreatmentId;
    private String healthIssue;
    private String treatment;
    private String koiId;
    private String appointmentId;
}
