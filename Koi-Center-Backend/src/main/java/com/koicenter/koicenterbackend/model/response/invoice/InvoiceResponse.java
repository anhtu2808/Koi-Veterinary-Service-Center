package com.koicenter.koicenterbackend.model.response.invoice;

import com.koicenter.koicenterbackend.model.enums.InvoiceType;
import com.koicenter.koicenterbackend.model.enums.PaymentStatus;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoiceResponse {
     double totalPrice;
     PaymentStatus status;
    LocalDateTime createAt;
    float unitPrice;
    String invoiceId;
    InvoiceType type ;
    int quantity ;
    int code ;
    float distance ;
    float deliveryPrice ;
}
