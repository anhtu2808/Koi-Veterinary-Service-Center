package com.koicenter.koicenterbackend.controller;


import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("/getByCustomerId")
    public ResponseEntity<ResponseObject> getAppointmentById(@RequestParam("customerId") String customerId) {
        List<AppointmentResponse> listAppointment = appointmentService.getAllAppointmentsByCustomerId(customerId);

        if (listAppointment != null && !listAppointment.isEmpty()) {
            return ResponseEntity.ok(new ResponseObject(200, "Success", listAppointment));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject(404, "No appointments found for customer ID: " + customerId, null));
        }
    }




    // api get Appointment detail
    @GetMapping("/detail")
    public ResponseEntity<ResponseObject> getAppointmentDetailById(@RequestParam String appointmentId) {
        AppointmentResponse listAppointment = appointmentService.getAppointmentByAppointmentId(appointmentId);
        if (listAppointment != null) {
            return ResponseObject.APIRepsonse(200, "Appointment found", HttpStatus.OK, listAppointment);
        } else {
            return ResponseObject.APIRepsonse(404, "Appointment not found", HttpStatus.NOT_FOUND, null);
        }
    }


    @GetMapping("/detailByVetId")
    public ResponseEntity<ResponseObject> getAllAppointmentByVetId(@RequestParam String vetId) {
        List<AppointmentResponse> listAppointment = appointmentService.getAllAppointmentByVetId(vetId);
        if (listAppointment != null && !listAppointment.isEmpty()) {
            return ResponseObject.APIRepsonse(200, "Success", HttpStatus.OK, listAppointment);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject(404, "No appointments found", null));
        }
    }
    //CREATE
    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createAppointment(@RequestBody AppointmentRequest appointmentRequest){
       AppointmentResponse appointmentResponse= appointmentService.createAppointment(appointmentRequest);
    return ResponseObject.APIRepsonse(200,"CRETEA APPOINTMENT SUCCESSFULLY",HttpStatus.OK,appointmentResponse);
    }
    // UPDATE
    @PostMapping("/update")
    public ResponseEntity<ResponseObject> updateAppointment(@RequestBody AppointmentRequest appointmentResponse) {
//        appointmentService.updateAppointment(appointmentResponse);
    return ResponseObject.APIRepsonse(200,"UPDATE APPOINTMENT SUCCESSFULLY",HttpStatus.OK," ");
    }
    }

