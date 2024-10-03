package com.koicenter.koicenterbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendEmalService {
    @Autowired
    JavaMailSender mailSender;

    @Value("${spring.mail.username}")  // Đã sửa cú pháp
    private String fromEmailId;

    public void sendMailSender(String recipient, String body, String subject) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmailId);  // Email người gửi
        message.setTo("nhantttse180345@fpt.edu.vn");      // Email người nhận
        message.setSubject(subject);   // Chủ đề email
        message.setText(body);         // Nội dung email
        mailSender.send(message);      // Gửi email
    }
}
