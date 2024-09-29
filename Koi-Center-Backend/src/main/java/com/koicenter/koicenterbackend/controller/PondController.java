package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.entity.Service;
import com.koicenter.koicenterbackend.model.request.PondUpdateRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.PondService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pond")
public class PondController {
    @Autowired
    private PondService pondService;


    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllPond() {
        try {
            List<Pond> pond = pondService.getAllPonds();
            return ResponseObject.APIRepsonse(200, "Get pond list success", HttpStatus.OK, pond);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal Server Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/{pondId}")
    public ResponseEntity<ResponseObject> getPondById(@PathVariable("pondId") String pondId) {
        try {
            Pond pond = pondService.getPondById(pondId);
            return ResponseObject.APIRepsonse(200, "Found pond successfully", HttpStatus.OK, pond);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PutMapping("/{pondId}")
    public ResponseEntity<ResponseObject> updatePond(@PathVariable("pondId") String pondId, @Valid @RequestBody PondUpdateRequest request) {
        try {
            Pond updatedPond = pondService.updatePond(pondId, request);
            return ResponseObject.APIRepsonse(200, "Update success", HttpStatus.OK, updatedPond);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
}
