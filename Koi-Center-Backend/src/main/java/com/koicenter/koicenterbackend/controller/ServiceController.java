package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.entity.Service;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/service")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @GetMapping("/all") //service_for khac ONLINE
    public ResponseEntity<ResponseObject> getAllServicesNotOnline() {
        List<Service> services = serviceService.getAllServiceByType();
        return ResponseObject.APIRepsonse("200", "Get service list success", HttpStatus.OK, services);
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<ResponseObject> getServiceById(@PathVariable("serviceId") String serviceId) {
        Service service = serviceService.getServiceById(serviceId);
        return ResponseObject.APIRepsonse("200", "Get service success", HttpStatus.OK, service);
    }
}
