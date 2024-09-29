package com.koicenter.koicenterbackend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koicenter.koicenterbackend.model.enums.ServiceType;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServiceResponse {
    String serviceId;
    String serviceName;
    String description;
    float basePrice;
    float deliveryPrice;
    float pondPrice;
    float tankPrice;
    ServiceType serviceFor;
    String image;

}
