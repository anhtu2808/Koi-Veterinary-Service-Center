package com.koicenter.koicenterbackend.controller;


import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.request.KoiUpdateRequest;
import com.koicenter.koicenterbackend.model.request.PondUpdateRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.KoiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/koi")
public class KoiController {

    @Autowired
    private KoiService koiService;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllPond() {
        try {
            List<Koi> koi = koiService.getAllKoi();
            return ResponseObject.APIRepsonse(200, "Get koi list success", HttpStatus.OK, koi);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal Server Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/{koiId}")
    public ResponseEntity<ResponseObject> getPondById(@PathVariable("koiId") String koiId) {
        try {
            Koi koi = koiService.getKoiById(koiId);
            return ResponseObject.APIRepsonse(200, "Found koi successfully", HttpStatus.OK, koi);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PutMapping("/{koiId}")
    public ResponseEntity<ResponseObject> updatePond(@PathVariable("koiId") String koiId, @Valid @RequestBody KoiUpdateRequest request) {
        try {
            Koi updatedKoi = koiService.updateKoi(koiId, request);
            return ResponseObject.APIRepsonse(200, "Update success", HttpStatus.OK, updatedKoi);
        } catch (AppException e) {
            return ResponseObject.APIRepsonse(404, e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
}
