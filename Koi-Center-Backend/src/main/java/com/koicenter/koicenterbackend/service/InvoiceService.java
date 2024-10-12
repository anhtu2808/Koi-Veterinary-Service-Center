package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Invoice;
import com.koicenter.koicenterbackend.model.request.invoice.InvoiceRequest;
import com.koicenter.koicenterbackend.model.response.invoice.InvoiceResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import com.koicenter.koicenterbackend.repository.InvoiceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvoiceService {
    InvoiceRepository invoiceRepository;
    AppointmentRepository appointmentRepository ;



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
    public InvoiceResponse updateInvoice(String invoiceId , InvoiceRequest invoiceRequest) {
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(() -> new AppException(
                ErrorCode.INVOICE_ID_NOT_FOUND.getCode(),
                ErrorCode.INVOICE_ID_NOT_FOUND.getMessage(),
                HttpStatus.NOT_FOUND));
        Appointment appointment = appointmentRepository.findById(invoiceRequest.getAppointmentId()).orElseThrow(() -> new AppException(
                ErrorCode.APPOINTMENT_ID_NOT_FOUND.getCode(),
                ErrorCode.APPOINTMENT_ID_NOT_FOUND.getMessage()
                , HttpStatus.NOT_FOUND));

        invoice.setUpdatDate(invoiceRequest.getUpdateDate());
        invoice.setTotalPrice(invoiceRequest.getTotalPrice());
        invoice.setCreateAt(invoiceRequest.getCreateAt());
        invoice.setPaymentStatus(invoiceRequest.isPaymentStatus());
        invoice.setAppointment(appointment);

        invoiceRepository.save(invoice);
        return InvoiceResponse.builder()
                .updateDate(invoice.getUpdatDate())
                .totalPrice(invoice.getTotalPrice())
                .paymentStatus(invoice.isPaymentStatus())
                .createAt(invoice.getCreateAt())
                .invoiceId(invoice.getInvoiceId())
                .build();
    }

}
