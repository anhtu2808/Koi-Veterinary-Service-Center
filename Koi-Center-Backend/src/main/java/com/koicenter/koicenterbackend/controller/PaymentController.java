package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.entity.Invoice;
import com.koicenter.koicenterbackend.model.request.treament.TreamentRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.koi.KoiTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import com.koicenter.koicenterbackend.repository.InvoiceRepository;
import com.koicenter.koicenterbackend.service.PaymentService;
import com.koicenter.koicenterbackend.service.TreatmentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    @Autowired
    PaymentService paymentService;
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    InvoiceRepository invoiceRepository;
    @Autowired
    TreatmentService treatmentService;
    private static TreamentRequest treamentRequestTemp;
    private static Float amountTemp;
    @PostMapping("/vn-pay")
    public ResponseEntity<ResponseObject> pay(HttpServletRequest request, @RequestBody TreamentRequest treamentRequest) {
        try {
            String paymentUrl = paymentService.createVnPayPayment(request);
            treamentRequestTemp = treamentRequest;
            String amount = request.getParameter("amount");
            if (amount == null || amount.isEmpty()) {
                return ResponseObject.APIRepsonse(400, "Amount is required", HttpStatus.BAD_REQUEST, null);
            }
            amountTemp = Float.parseFloat(amount);
            return ResponseObject.APIRepsonse(200, "Redirecting to VN Pay", HttpStatus.OK, paymentUrl);
        } catch (NumberFormatException e) {
            return ResponseObject.APIRepsonse(400, "Invalid amount format", HttpStatus.BAD_REQUEST, null);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
    @GetMapping("/vn-pay-callback")
    public ResponseEntity<ResponseObject> payCallbackHandler(HttpServletRequest request) {
        try {
            String status = request.getParameter("vnp_ResponseCode");
            if ("00".equals(status)) {
                TreamentRequest treatmentRequest = treamentRequestTemp;
                if (treatmentRequest == null) {
                    return ResponseObject.APIRepsonse(400, "Treatment request not found", HttpStatus.BAD_REQUEST, null);
                }
                List<Object> appointmentResponse = treatmentService.createAppointments(treatmentRequest.getSelected(), treatmentRequest.getAppointmentRequest());
                if (appointmentResponse.isEmpty()) {
                    return ResponseObject.APIRepsonse(404, "No appointments created", HttpStatus.NOT_FOUND, null);
                }
                Object firstObject = appointmentResponse.get(0);
                String appointmentId = null;
                if (firstObject instanceof PondTreatmentResponse) {
                    PondTreatmentResponse firstAppointment = (PondTreatmentResponse) firstObject;
                    appointmentId = firstAppointment.getAppointmentId();
                    System.out.println("Appointment ID from PondTreatmentResponse: " + appointmentId);
                } else if (firstObject instanceof KoiTreatmentResponse) {
                    KoiTreatmentResponse firstAppointment = (KoiTreatmentResponse) firstObject;
                    appointmentId = firstAppointment.getAppointmentId();
                    System.out.println("Appointment ID from KoiTreatmentResponse: " + appointmentId);
                }
                if (appointmentId != null) {
                    insertToInvoice(appointmentId, amountTemp);
                    return ResponseObject.APIRepsonse(200, "Payment successful, appointment created", HttpStatus.OK, appointmentId);
                } else {
                    return ResponseObject.APIRepsonse(500, "Appointment ID is null", HttpStatus.INTERNAL_SERVER_ERROR, null);
                }
            } else {
                return ResponseObject.APIRepsonse(400, "Payment failed", HttpStatus.BAD_REQUEST, null);
            }
        } catch (Exception e) {
            return ResponseObject.APIRepsonse(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
    private void insertToInvoice(String appointmentId, Float ammout) {
        Invoice newInvoice = Invoice.builder()
                .paymentStatus(true)
                .totalPrice(ammout)
                .createAt(LocalDateTime.now())
                .appointment(appointmentRepository.findAppointmentById(appointmentId))
                .build();
        invoiceRepository.save(newInvoice);
    }
}