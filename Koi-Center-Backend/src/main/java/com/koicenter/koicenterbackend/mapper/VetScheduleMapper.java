package com.koicenter.koicenterbackend.mapper;

import com.koicenter.koicenterbackend.model.entity.VetSchedule;
import com.koicenter.koicenterbackend.model.response.veterinarian.VetScheduleResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VetScheduleMapper {
    @Mapping(source = "vetSchedule.startTime", target = "start_time")
    @Mapping(source = "vetSchedule.endTime", target = "end_time")
    @Mapping(source = "vetSchedule.scheduleId", target = "schedule_id")
    @Mapping(source = "vetSchedule.veterinarian.vetId", target = "vet_Id")
    VetScheduleResponse toVetScheduleResponse(VetSchedule vetSchedule);

}
