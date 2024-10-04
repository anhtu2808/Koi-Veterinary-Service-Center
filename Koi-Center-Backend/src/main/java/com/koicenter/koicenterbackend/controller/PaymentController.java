package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.entity.PaymentDTO;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.PaymentService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    @GetMapping("/vn-pay")
    public ResponseObject pay(HttpServletRequest request) {
        return new ResponseObject(200, "Success", paymentService.createVnPayPayment(request));
    }
    @GetMapping("/vn-pay-callback")
    public ResponseObject payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        String appointmentId = request.getParameter("appointmentId");
        if (status.equals("00")) {
            // insert info about appointment into dabaase here
            return new ResponseObject(200, "Success", new PaymentDTO.VNPayResponse("00", "Success", ""));
        } else {
            return new ResponseObject(400, "Failed", null);
        }
    }
}