package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import com.koicenter.koicenterbackend.model.request.veterinarian.VetScheduleRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.veterinarian.VeterinarianResponse;
import com.koicenter.koicenterbackend.service.VetScheduleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vetSchedules")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class VetScheduleController {
    VetScheduleService vetScheduleService ;


    @GetMapping("")
    public ResponseEntity<ResponseObject> getScheduleForBooking(@RequestParam String type,@RequestParam String vetId) {
        String types = type.toLowerCase();
        if (types.contains("HOME".toLowerCase()) || type.toLowerCase().contains("CENTER".toLowerCase()) || type.toLowerCase().contains("ONLINE".toLowerCase())) {
            VetScheduleRequest vetScheduleRequest = new VetScheduleRequest();
            vetScheduleRequest.setVet_id(vetId);
            vetScheduleRequest.setAppointmentType(AppointmentType.valueOf(type));
            log.info("Toi o day ban o dau ");
            return ResponseObject.APIRepsonse(200, "Get Schedule ID Successfully", HttpStatus.OK, vetScheduleService.getScheduleForBooking(vetScheduleRequest));
        } else {
            return ResponseObject.APIRepsonse(404, "Not Found this Type in Appointment_Type", HttpStatus.NOT_FOUND, " ");
        }
    }
        @GetMapping("/{vetSchedule}")
        public ResponseEntity<ResponseObject> getScheduleForBooking(@RequestBody VetScheduleRequest vetSchedule) {
            return ResponseObject.APIRepsonse(200,"Get Schedule ID Successfully", HttpStatus.OK,vetSchedule);
        }
    @GetMapping("/getVeterinariansByDateTime")
    public ResponseEntity<ResponseObject> getVeterinariansByDateTime(@RequestBody VetScheduleRequest vetScheduleRequest) {
        List<VeterinarianResponse> list =  vetScheduleService.getVeterinariansByDateTime(vetScheduleRequest);
        if(!list.isEmpty()){
            return ResponseObject.APIRepsonse(200, "Veterinarians found successfully By Date Time ", HttpStatus.OK, list);
        }else{
            return ResponseObject.APIRepsonse(404, "Veterinarians not found", HttpStatus.NOT_FOUND,"");
        }
    }
    }
