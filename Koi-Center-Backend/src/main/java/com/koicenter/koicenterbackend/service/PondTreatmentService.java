package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.repository.PondTreatmentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PondTreatmentService {
    PondTreatmentRepository pondTreatmentRepository ;
    //GET PondTreament Because
    @GetMapping("/{AppointmentId}")
    public ResponseEntity<ResponseObject> getPondTreatment(@PathVariable int AppointmentId) {
        return ResponseObject.APIRepsonse(200,"Get Pond Treament By Appointment Id ", HttpStatus.OK,null);
    }
}
