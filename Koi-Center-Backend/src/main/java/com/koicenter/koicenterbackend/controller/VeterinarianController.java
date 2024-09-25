package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import com.koicenter.koicenterbackend.service.VeterinarianService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/veterinarian")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class VeterinarianController {
    VeterinarianService veterinarianService;
    @GetMapping("/{vetId}")
    public ResponseEntity<ResponseObject> getVeterinarianById (@PathVariable String vetId){
        return ResponseObject.APIRepsonse("200","Get ID Veterinarian Succesfully ", HttpStatus.OK,veterinarianService.getVeterinarianById(vetId));
    }


    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllVeterinarian() {
        List<VeterinarianResponse> listVet = veterinarianService.getAllVet();
        log.info("toi dang o day ",listVet);
        return ResponseObject.APIRepsonse("200", "List of veterinarians retrieved successfully", HttpStatus.OK, listVet);
    }


}
