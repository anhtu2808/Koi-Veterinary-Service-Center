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
public class KoiTreatmentRequest {
    String koiTreatmentId;
    String koiId;
    String appointmentId;
    String healthIssue;
    String treatment;
    String prescription_id ;
}
