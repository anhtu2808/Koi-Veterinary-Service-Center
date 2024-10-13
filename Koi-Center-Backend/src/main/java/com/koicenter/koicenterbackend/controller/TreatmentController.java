package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.request.koi.KoiTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.pond.PondTreatmentRequest;
import com.koicenter.koicenterbackend.model.request.treament.TreamentRequest;
import com.koicenter.koicenterbackend.model.response.koi.KoiTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.KoiTreatmentService;
import com.koicenter.koicenterbackend.service.PondTreatmentService;
import com.koicenter.koicenterbackend.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/treatments")
public class TreatmentController {
    @Autowired
    private PondTreatmentService pondTreatmentService;

    @Autowired
    private KoiTreatmentService koiTreatmentService;

    @Autowired
    private TreatmentService treatmentService;

    @PostMapping("/ponds")
    public ResponseEntity<ResponseObject> createPondTreatment(@RequestBody PondTreatmentRequest pondTreatmentRequest) {
        PondTreatmentResponse pondTreatmentResponse = pondTreatmentService.createPondTreatment(pondTreatmentRequest);
        return ResponseObject.APIRepsonse(200, "create successfully!", HttpStatus.CREATED, pondTreatmentResponse);
    }


    @PostMapping("/kois")
    public ResponseEntity<ResponseObject> createKoiTreatment(@RequestBody KoiTreatmentRequest koiTreatmentRequest) {
        KoiTreatmentResponse koiTreatmentResponse = koiTreatmentService.createKoiTreatment(koiTreatmentRequest);
        return ResponseObject.APIRepsonse(200, "create successfully!", HttpStatus.CREATED, koiTreatmentResponse);
    }


    @PutMapping("/updatePondTreatment")
    public ResponseEntity<ResponseObject> updatePondTreament(@RequestBody PondTreatmentRequest pondTreatmentRequest) {
        PondTreatmentResponse pondTreatmentResponse =  treatmentService.updatePondTreatment(pondTreatmentRequest);
        if (pondTreatmentResponse != null) {
            return ResponseObject.APIRepsonse(200, "UPDATE PONDTREAMENT SUCCESSFULLY", HttpStatus.OK, pondTreatmentRequest);
        } else {
            return ResponseObject.APIRepsonse(404, "Bad Request: Invalid data", HttpStatus.BAD_REQUEST, "");
        }
    }
    @PutMapping("/updateKoiTreatment")
    public ResponseEntity<ResponseObject> updateKoiTreament(@RequestBody KoiTreatmentRequest koiTreatmentRequest) {
        KoiTreatmentResponse koiTreatmentResponse =  treatmentService.updateKoiTreatment(koiTreatmentRequest);
        if (koiTreatmentResponse != null) {
            return ResponseObject.APIRepsonse(200, "UPDATE KOITREAMENT SUCCESSFULLY", HttpStatus.OK, koiTreatmentResponse);
        } else {
            return ResponseObject.APIRepsonse(404, "Bad Request: Invalid data", HttpStatus.BAD_REQUEST, "");
        }
    }
 @GetMapping("/{id}")
 public ResponseEntity<ResponseObject> createAppointment( @PathVariable String  id) {
    Object list =  treatmentService.searchTreamentByKoiIdOrPondId(id);
     if(list != null ){
         return ResponseObject.APIRepsonse(201, "Found successfully! ", HttpStatus.CREATED, list);
     }else{
         return ResponseObject.APIRepsonse(404,"Can not found ", HttpStatus.NOT_FOUND,"");
     }
 }
 @GetMapping("/secondPayment")
 public ResponseEntity<ResponseObject> getSecondPayment( @RequestParam String  appointmentId) {
     Object list =  treatmentService.getSecondPayment(appointmentId);
     if(list != null ){
         return ResponseObject.APIRepsonse(200, "Found successfully! ", HttpStatus.CREATED, list);
     }else{
         return ResponseObject.APIRepsonse(404,"Can not found ", HttpStatus.NOT_FOUND,"");
     }
 }
}
