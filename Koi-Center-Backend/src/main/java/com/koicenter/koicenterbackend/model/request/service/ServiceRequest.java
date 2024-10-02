package com.koicenter.koicenterbackend.model.request.service;

import com.koicenter.koicenterbackend.model.enums.ServiceType;
import lombok.*;
import lombok.experimental.FieldDefaults;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceRequest {
    String serviceName;
    String description;
    float basePrice;
    float pondPrice;
    float koiPrice;
    ServiceType serviceFor;
    String image;
}
