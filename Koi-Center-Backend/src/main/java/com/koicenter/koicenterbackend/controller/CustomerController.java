package com.koicenter.koicenterbackend.controller;


import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @GetMapping("/{customerId}/kois")
    public ResponseEntity<ResponseObject> getKoisByCustomerId(@PathVariable("customerId") String customerId) {
        try {
            List<Koi> kois = customerService.getKoiByCustomerId(customerId);
            if (kois.isEmpty()) {
                return ResponseObject.APIRepsonse(404, "Customer do not have any koi", HttpStatus.NOT_FOUND, null);
            } else{
                return ResponseObject.APIRepsonse(200, "Found kois successfully", HttpStatus.OK, kois);
            }
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
    @GetMapping("/{customerId}/ponds")
    public ResponseEntity<ResponseObject> getPondsByCustomerId(@PathVariable("customerId") String customerId) {
        try {
            List<Pond> ponds = customerService.getPondsByCustomerId(customerId);
            if (ponds.isEmpty()) {
                return ResponseObject.APIRepsonse(404, "Customer do not have any pond", HttpStatus.NOT_FOUND, null);
            } else{
                return ResponseObject.APIRepsonse(200, "Found ponds successfully", HttpStatus.OK, ponds);}
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
    
}
