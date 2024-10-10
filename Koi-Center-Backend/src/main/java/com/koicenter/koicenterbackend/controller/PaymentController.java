package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.configuration.CustomEnviroment;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Invoice;
import com.koicenter.koicenterbackend.model.momo.PaymentResponse;
import com.koicenter.koicenterbackend.model.momo.RequestType;
import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.request.treament.TreamentRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.koi.KoiTreatmentResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import com.koicenter.koicenterbackend.repository.InvoiceRepository;
import com.koicenter.koicenterbackend.service.CreateOrderMoMo;
import com.koicenter.koicenterbackend.service.PaymentService;
import com.koicenter.koicenterbackend.service.TreatmentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private static String appointmentIdTemp = "";
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
            System.out.println("Redirect:  " + paymentUrl);
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
                if (firstObject instanceof PondTreatmentResponse firstAppointment) {
                    appointmentId = firstAppointment.getAppointmentId();
                } else if (firstObject instanceof KoiTreatmentResponse firstAppointment) {
                    appointmentId = firstAppointment.getAppointmentId();
                }
                if (appointmentId != null) {
                    insertToInvoice(appointmentId, amountTemp);
                    return ResponseEntity.status(HttpStatus.OK).location(URI.create("localhost:3000/booking/paymentsuccess")).build();
                } else {
                    return ResponseObject.APIRepsonse(500, "Appointment ID is null", HttpStatus.INTERNAL_SERVER_ERROR, null);
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).location(URI.create("localhost:3000/booking/paymentfailed")).build();
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


    @GetMapping("/momo-pay")
    public ResponseEntity<ResponseObject> payWithMoMo(HttpServletRequest request, @RequestBody TreamentRequest treamentRequest) {
        try {
//            String appointmentId = "627062bb-a967-4728-989b-4fcdcd51943f";

            String amount = request.getParameter("amount");
            amountTemp = Float.parseFloat(amount);
            treamentRequestTemp = treamentRequest;

            CustomEnviroment customEnviroment = CustomEnviroment.selectEnv("dev");
            String orderId = "order-" + System.currentTimeMillis();
            String requestId = "request-" + System.currentTimeMillis();
            String orderInfo = "Pay for MoMo orders for orders";
            String returnUrl = "http://localhost:3000/booking/paymentsuccess";
            String notifyUrl = "http://localhost:8080/api/v1/payment/momo-pay-callback";
            String extraData = "";

            PaymentResponse response = CreateOrderMoMo.process(customEnviroment,
                    orderId,
                    requestId,
                    String.valueOf(amount),
                    orderInfo,
                    returnUrl,
                    notifyUrl,
                    extraData,
                    RequestType.PAY_WITH_ATM,
                    true);

            if (response != null) {
                return ResponseObject.APIRepsonse(200, "Redirecting to MoMo payment", HttpStatus.OK, response);
            }

            return ResponseObject.APIRepsonse(400, "Error creating MoMo order.", HttpStatus.BAD_REQUEST, null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseObject.APIRepsonse(500, "Request processing error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }




    @PostMapping("/momo-pay-callback")
    public ResponseEntity<ResponseObject> momoPayCallback(@RequestBody Map<String, Object> payload) {
        try {


            String message = (String) payload.get("message");
            Integer resultCode = (Integer) payload.get("resultCode");


            if (resultCode == 0) {
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
                if (firstObject instanceof PondTreatmentResponse firstAppointment) {
                    appointmentId = firstAppointment.getAppointmentId();
                } else if (firstObject instanceof KoiTreatmentResponse firstAppointment) {
                    appointmentId = firstAppointment.getAppointmentId();
                }
                if (appointmentId != null) {
                    insertToInvoice(appointmentId, amountTemp);
                    return ResponseEntity.status(HttpStatus.OK).location(URI.create("localhost:3000/booking/paymentsuccess")).build();
                } else {
                    return ResponseObject.APIRepsonse(500, "Appointment ID is null", HttpStatus.INTERNAL_SERVER_ERROR, null);
                }
            } else {
                System.out.println("Thanh toán thất bại: " + message);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).location(URI.create("localhost:3000/booking/paymentfail")).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseObject.APIRepsonse(500, "Error callback: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }


}