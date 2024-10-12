package com.koicenter.koicenterbackend.model.request.prescription;

import com.koicenter.koicenterbackend.model.enums.MedUnit;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MedicineRequest {
//    String medicineId;
    String name;
    String description;
    MedUnit medUnit;
}
