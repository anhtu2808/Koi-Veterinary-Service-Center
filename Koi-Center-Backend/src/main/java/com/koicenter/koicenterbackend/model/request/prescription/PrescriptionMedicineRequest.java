package com.koicenter.koicenterbackend.model.request.prescription;

import com.koicenter.koicenterbackend.model.entity.Medicine;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PrescriptionMedicineRequest {
    MedicineRequest medicine;
    int quantity;
    String dosage;
}
