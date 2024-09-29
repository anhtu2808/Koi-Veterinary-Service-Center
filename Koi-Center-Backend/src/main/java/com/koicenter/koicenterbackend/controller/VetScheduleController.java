package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.entity.VetSchedule;
import com.koicenter.koicenterbackend.model.request.VetScheduleRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.VetScheduleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vetSchedules")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class VetScheduleController {
    VetScheduleService vetScheduleService ;
    @GetMapping("/{vetSchedule}")
    public ResponseEntity<ResponseObject> getScheduleForBooking(@RequestBody VetScheduleRequest vetSchedule) {
        return ResponseObject.APIRepsonse(200,"Get Schedule ID Successfully", HttpStatus.OK,vetSchedule);
    }
}
