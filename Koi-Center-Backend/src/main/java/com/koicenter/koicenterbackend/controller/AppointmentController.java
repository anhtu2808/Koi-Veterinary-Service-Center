package com.koicenter.koicenterbackend.controller;


import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.request.treament.TreamentRequest;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.AppointmentService;
import com.koicenter.koicenterbackend.service.TreatmentService;
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

    @Autowired
     TreatmentService treatmentService;
    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllAppointments(@RequestParam String status) {
        List<AppointmentResponse> listAppointment = appointmentService.getAllAppointments(status);
        return ResponseObject.APIRepsonse(200, "", HttpStatus.OK, listAppointment);
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

    //     UPDATE
    @PutMapping("/update")
    public ResponseEntity<ResponseObject> updateAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        AppointmentResponse appointmentResponse = appointmentService.updateAppointment(appointmentRequest);
        if (appointmentResponse != null) {
            return ResponseObject.APIRepsonse(200, "UPDATE APPOINTMENT SUCCESSFULLY", HttpStatus.OK, appointmentResponse);
        } else {
            return ResponseObject.APIRepsonse(404, "Bad Request: Invalid data", HttpStatus.BAD_REQUEST, "");
        }
    }
    //tạo nhiều cá,pond and appointment
    @PostMapping("")
    public ResponseEntity<ResponseObject> createAppointment( @RequestBody TreamentRequest treamentRequest) {
        List<?> list =  treatmentService.createAppointments(treamentRequest.getSelected(),treamentRequest.getAppointmentRequest());
        if(!list.isEmpty()){
            return ResponseObject.APIRepsonse(201, "Treament Created successfully! ", HttpStatus.CREATED, list);
        }else{
            return ResponseObject.APIRepsonse(404, "Bad Request: Invalid data", HttpStatus.BAD_REQUEST,"");
        }
    }
}
