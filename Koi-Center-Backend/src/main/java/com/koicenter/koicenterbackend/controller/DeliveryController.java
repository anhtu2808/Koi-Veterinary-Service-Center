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

import java.util.List;

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

    @GetMapping()
    public ResponseEntity<ResponseObject> getAllDelivery() {
        try {
            List<DeliveryResponse> deli = deliveryService.getAllDeliveries();
            return ResponseObject.APIRepsonse(200, "Retrieved all delivery successfully", HttpStatus.OK, deli);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }


    @GetMapping("/{deliveryId}")
    public ResponseEntity<ResponseObject> getDeliveryById(@PathVariable("deliveryId") String deliveryId) {
        try {
            DeliveryResponse deli = deliveryService.getDeliveryById(deliveryId);
            return ResponseObject.APIRepsonse(200, "Found delivery successfully", HttpStatus.OK, deli);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, "Delivery do not exist", HttpStatus.NOT_FOUND, null);
        }
    }

}
