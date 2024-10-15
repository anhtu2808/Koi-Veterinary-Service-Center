package com.koicenter.koicenterbackend.mapper;

import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import com.koicenter.koicenterbackend.model.response.pond.PondTreatmentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PondTreatmentMapper {
    @Mapping(target="pondId",ignore = true)
    @Mapping(target="appointmentId",ignore = true)
    @Mapping(source = "pondTreatment.prescription.id",target = "prescriptionId")
    PondTreatmentResponse toPondTreatmentResponse(PondTreatment pondTreatment);

}
