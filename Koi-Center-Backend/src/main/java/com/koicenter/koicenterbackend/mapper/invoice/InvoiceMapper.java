package com.koicenter.koicenterbackend.mapper.invoice;

import com.koicenter.koicenterbackend.model.entity.Invoice;
import com.koicenter.koicenterbackend.model.response.invoice.InvoiceResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    InvoiceResponse toInvoiceResponse(Invoice invoice);
}
