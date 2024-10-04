package com.koicenter.koicenterbackend.controller;


import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.model.request.delivery.DeliveryRequest;
import com.koicenter.koicenterbackend.model.request.prescription.MedicineRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.delivery.DeliveryResponse;
import com.koicenter.koicenterbackend.model.response.medicine.MedicineResponse;
import com.koicenter.koicenterbackend.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/deliveries")
public class DeliveryController {
    @Autowired
    private DeliveryService deliveryService;

    @PutMapping("/{deliveryId}")
    public ResponseEntity<ResponseObject> updateDelivery(@PathVariable("deliveryId") String deliveryId, @RequestBody DeliveryRequest deliveryRequest) {
        try {
            DeliveryResponse deliveryResponse = deliveryService.updateDelivery(deliveryId, deliveryRequest);
            return ResponseObject.APIRepsonse(200, "Updated delivery successfully", HttpStatus.OK, deliveryResponse);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, "Delivery ID do not exist", e.getHttpStatus(), null);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

}
