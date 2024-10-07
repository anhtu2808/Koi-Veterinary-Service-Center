package com.koicenter.koicenterbackend.model.response.medicine;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Set;
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PrescriptionByIdResponse {
    Set<PreMedResponse> prescriptionMedicines;
}
