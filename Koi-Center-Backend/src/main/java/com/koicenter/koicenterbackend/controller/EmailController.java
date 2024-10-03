package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.service.SendEmalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mail")
public class EmailController {

    @Autowired
    SendEmalService sendEmalService;

    @GetMapping("/sendEmail")
    public String sendEmail() {
        sendEmalService.sendMailSender("vulhse182602@gmail.com", "textbody", "test");
        return "success";
    }
}
