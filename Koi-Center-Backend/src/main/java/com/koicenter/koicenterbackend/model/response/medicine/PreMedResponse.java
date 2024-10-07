package com.koicenter.koicenterbackend.model.response.medicine;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PreMedResponse {
    String medicineId;
    String medicineName;
    int quantity;
    String dosage;
}
