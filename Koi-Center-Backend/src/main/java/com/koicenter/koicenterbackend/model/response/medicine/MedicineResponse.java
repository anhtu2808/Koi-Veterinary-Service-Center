package com.koicenter.koicenterbackend.model.response.medicine;

import com.koicenter.koicenterbackend.model.enums.MedUnit;
import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MedicineResponse {
    String medicineId;
    String name;
    String description;
    MedUnit medUnit;
}
