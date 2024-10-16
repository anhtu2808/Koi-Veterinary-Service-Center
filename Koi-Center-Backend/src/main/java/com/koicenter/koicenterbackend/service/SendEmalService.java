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

    public boolean sendMailSender(String recipient, String body, String subject) {
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmailId);  // Email người gửi ne babe
            message.setTo(recipient);      // Email người nhận ne babe
            message.setSubject(subject);   // Chủ đề email ne babe
            message.setText(body);         // Nội dung email ne babe
            mailSender.send(message);      // Gửi email ne babe
            return true;
        }catch (Exception e){
             return false;
        }
    }
}
