package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.invoice.InvoiceResponse;
import com.koicenter.koicenterbackend.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/invoices")
public class InvoiceController {
    @Autowired
    InvoiceService invoiceService;

    @PostMapping("/get")
    public ResponseEntity<ResponseObject> getInvoice(@RequestParam String appointmentId) {
        InvoiceResponse invoiceResponse = invoiceService.getInvoiceByAppointmentId(appointmentId);
        if (invoiceResponse == null) {
            return ResponseObject.APIRepsonse(404, "Invoice not found for appointment ID: " + appointmentId, HttpStatus.NOT_FOUND, null);
        }
        return ResponseObject.APIRepsonse(200, "Invoice retrieved successfully", HttpStatus.OK, invoiceResponse);
    }

}
