package com.koicenter.koicenterbackend.model.response.koi;

import com.koicenter.koicenterbackend.model.response.pond.PondResponse;
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
    KoiResponse koi;
String prescription_id ;

}
