package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.entity.Invoice;
import com.koicenter.koicenterbackend.model.response.invoice.InvoiceResponse;
import com.koicenter.koicenterbackend.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {
    @Autowired
    InvoiceRepository invoiceRepository;

    public InvoiceResponse getInvoiceByAppointmentId(String appointmentId) {
        Invoice invoice = invoiceRepository.findByAppointment_AppointmentId(appointmentId);
        return InvoiceResponse.builder()
                .updateDate(invoice.getUpdatDate())
                .totalPrice(invoice.getTotalPrice())
                .paymentStatus(invoice.isPaymentStatus())
                .createAt(invoice.getCreateAt())
                .invoiceId(invoice.getInvoiceId())
                .build();
    }
}
