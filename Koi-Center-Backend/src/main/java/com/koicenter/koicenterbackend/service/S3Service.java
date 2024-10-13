package com.koicenter.koicenterbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import java.net.URL;
import java.time.Duration;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Presigner s3Presigner;
    @Value("${aws.bucketName}")
    private String bucketName ;  // Thay thế bằng tên bucket của bạn

    public S3Service(S3Presigner s3Presigner) {
        this.s3Presigner = s3Presigner;
    }
    // hàm kí tên URL cho frontend up ảnh
    public URL generatePresignedUrl(String objectKey) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(UUID.randomUUID()+ "_"+ objectKey )
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(b -> b
                .signatureDuration(Duration.ofMinutes(10))  // URL hết hạn sau 10 phút
                .putObjectRequest(objectRequest));

        return presignedRequest.url();
    }
}

