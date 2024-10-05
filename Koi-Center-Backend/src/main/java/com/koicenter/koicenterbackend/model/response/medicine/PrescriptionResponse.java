package com.koicenter.koicenterbackend.model.response.medicine;

import com.koicenter.koicenterbackend.model.request.prescription.PrescriptionMedicineRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;
import java.util.Set;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PrescriptionResponse {
    String id;
    String name;
    ZonedDateTime createdDate;
    String note;
    String appointmentId;
    Set<PrescriptionMedicineResponse> prescriptionMedicines;
}
