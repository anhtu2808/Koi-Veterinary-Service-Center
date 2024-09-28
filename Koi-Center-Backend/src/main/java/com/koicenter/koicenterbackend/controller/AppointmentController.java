package com.koicenter.koicenterbackend.controller;


import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.response.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {



    // Get All appointment
    @Autowired
    AppointmentService appointmentService;
    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllAppointments() {
            List<AppointmentResponse> listAppointment = appointmentService.getAllAppointments();
            return ResponseObject.APIRepsonse(200, "", HttpStatus.OK, listAppointment);
    }

    // Get appointment by customerId

}
