package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.service.S3Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    private final S3Service s3Service;

    public ImageController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping("/presigned-url")
    public URL getPresignedUrl(@RequestParam String imageName) {
        return s3Service.generatePresignedUrl(imageName);
    }
}

