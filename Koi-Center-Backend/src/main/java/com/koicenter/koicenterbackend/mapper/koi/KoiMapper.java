package com.koicenter.koicenterbackend.mapper.koi;

import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.response.koi.KoiResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface KoiMapper {
    KoiResponse toKoiResponse(Koi koi);

}
