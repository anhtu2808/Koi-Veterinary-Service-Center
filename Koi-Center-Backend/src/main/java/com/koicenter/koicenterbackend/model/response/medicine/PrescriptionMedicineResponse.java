package com.koicenter.koicenterbackend.model.response.medicine;

import com.koicenter.koicenterbackend.model.request.prescription.MedicineRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PrescriptionMedicineResponse {
    MedicineResponse medicine;
    int quantity;
    String dosage;
}
