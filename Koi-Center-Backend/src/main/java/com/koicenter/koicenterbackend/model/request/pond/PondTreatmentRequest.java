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
public class PondTreatmentRequest {
    String pondTreatmentId;
    private String pondId;
    private String appointmentId;
    private String healthIssue;
    private String treatment;
    String prescription_id ;

}
