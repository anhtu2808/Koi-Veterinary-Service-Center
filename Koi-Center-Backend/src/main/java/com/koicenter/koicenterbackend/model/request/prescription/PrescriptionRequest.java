package com.koicenter.koicenterbackend.model.request.prescription;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PrescriptionRequest {
//    String id;
    String name;
    ZonedDateTime createdDate;
    String note;
    String appointmentId;
    Set<PrescriptionMedicineRequest> prescriptionMedicines;
}
