package com.koicenter.koicenterbackend.mapper;

import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.request.authentication.RegisterRequest;
import com.koicenter.koicenterbackend.model.response.veterinarian.VeterinarianResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VeterinariansMapper {
   @Mapping(source = "vetId",target = "vetId")
   @Mapping(source = "googleMeet",target = "googleMeet")
   @Mapping(source = "status",target = "vetStatus")
   @Mapping(source = "image",target = "imageVeterinarian")
   @Mapping(target = "user",ignore = true)
   VeterinarianResponse toVeterinarianResponse(Veterinarian veterinarian);
}
