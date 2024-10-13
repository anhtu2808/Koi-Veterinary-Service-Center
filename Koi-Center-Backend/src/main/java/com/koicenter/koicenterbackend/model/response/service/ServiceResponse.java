package com.koicenter.koicenterbackend.model.response.service;

import com.koicenter.koicenterbackend.model.enums.ServiceType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ServiceResponse {
    String serviceId;
    String serviceName;
    String description;
    float basePrice;
    float pondPrice;
    float koiPrice;
    ServiceType serviceFor;
    String image;
    boolean status ;
}
