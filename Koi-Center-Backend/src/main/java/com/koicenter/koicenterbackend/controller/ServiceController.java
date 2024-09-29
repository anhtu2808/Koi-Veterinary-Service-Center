package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.entity.Service;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/services")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @GetMapping("") //service_for khac ONLINE
    public ResponseEntity<ResponseObject> getAllServicesNotOnline() {
        List<Service> services = serviceService.getAllService();
        return ResponseObject.APIRepsonse(200, "Get service list success", HttpStatus.OK, services);
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<ResponseObject> getServiceById(@PathVariable("serviceId") String serviceId) {
        Service service = serviceService.getServiceById(serviceId);
        return ResponseObject.APIRepsonse(200, "Get service success", HttpStatus.OK, service);
    }

    @GetMapping("/appointmentType/{serviceFor}")//Appoinment type de lay ra tung servicefor
    public ResponseEntity<ResponseObject> getServiceFor(@PathVariable String serviceFor){
        if(serviceFor.toLowerCase().equals("CENTER".toLowerCase()) || serviceFor.toLowerCase().equals("MOBILE".toLowerCase()) || serviceFor.toLowerCase().equals("ONLINE".toLowerCase())) {
        return ResponseObject.APIRepsonse(200, "GET Appointment_Type Successfully", HttpStatus.OK, serviceService.getServiceFor(serviceFor));
        }
        else {
            return ResponseObject.APIRepsonse(404, "Appointment_Type Not Found ", HttpStatus.NOT_FOUND, "");

        }
    }
}
