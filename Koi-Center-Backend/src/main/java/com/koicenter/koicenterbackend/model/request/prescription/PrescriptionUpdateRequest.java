package com.koicenter.koicenterbackend.model.request.prescription;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PrescriptionUpdateRequest {
    Set<PrescriptionMedicineRequest> prescriptionMedicines;
}
