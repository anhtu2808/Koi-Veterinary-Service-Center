package com.koicenter.koicenterbackend.model.request.koi;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class KoiRequest {
        String breed;
        int age;
        float height;
        float weight;
        String healthStatus;
        String notes;
        String image;
        String customerId;
}
