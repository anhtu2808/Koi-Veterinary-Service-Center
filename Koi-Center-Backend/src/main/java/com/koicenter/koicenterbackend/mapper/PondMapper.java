package com.koicenter.koicenterbackend.mapper;

import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import com.koicenter.koicenterbackend.model.response.pond.PondResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PondMapper {
    @Mapping(target="customerId",source="pond.customer.customerId")
    PondResponse toPondResponse(Pond pond);

}
