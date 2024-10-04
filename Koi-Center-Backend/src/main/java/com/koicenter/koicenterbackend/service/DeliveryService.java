package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Delivery;
import com.koicenter.koicenterbackend.model.request.delivery.DeliveryRequest;
import com.koicenter.koicenterbackend.model.response.delivery.DeliveryResponse;
import com.koicenter.koicenterbackend.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService {
    @Autowired
    private DeliveryRepository deliveryRepository;

    public DeliveryResponse updateDelivery(String id, DeliveryRequest deliveryRequest) {
        Delivery delivery = deliveryRepository.findById(id).orElseThrow(()->
        new AppException(ErrorCode.DELIVERY_ID_NOT_EXITS.getCode(),
                ErrorCode.DELIVERY_ID_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));

        delivery.setPrice(deliveryRequest.getPrice());
        delivery.setFromPlace(deliveryRequest.getFromPlace());
        delivery.setToPlace(deliveryRequest.getToPlace());
        deliveryRepository.save(delivery);

        return new DeliveryResponse(delivery.getDeliveryId(), delivery.getFromPlace(), delivery.getToPlace(), delivery.getPrice());

    }
}
