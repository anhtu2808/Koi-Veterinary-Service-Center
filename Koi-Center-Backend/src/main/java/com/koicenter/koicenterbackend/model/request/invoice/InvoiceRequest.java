package com.koicenter.koicenterbackend.model.request.invoice;

import com.koicenter.koicenterbackend.model.entity.Appointment;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class InvoiceRequest {
    String invoiceId;
    LocalDateTime updateDate;
    float totalPrice;
    boolean paymentStatus;
    LocalDateTime createAt;
    String  appointmentId;

}
