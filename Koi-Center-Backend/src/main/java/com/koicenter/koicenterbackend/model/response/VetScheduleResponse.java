package com.koicenter.koicenterbackend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.StatusVetSchedule;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VetScheduleResponse {
    String schedule_id;
    LocalDate date;
    LocalTime start_time;
    LocalTime end_time;
    StatusVetSchedule status;
    Veterinarian veterinarian;

}
