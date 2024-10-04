package com.koicenter.koicenterbackend.model.response.delivery;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DeliveryResponse {
    String deliveryId;
    float fromPlace;
    float toPlace;
    float price;
}
