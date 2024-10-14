package com.koicenter.koicenterbackend.model.response.invoice;

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
     boolean paymentStatus;
    LocalDateTime createAt;
    LocalDateTime updateDate;
    String invoiceId;


}
