package com.koicenter.koicenterbackend.model.request;

import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class VetScheduleRequest {
    String vet_id ;
    String schedule_id ;

    AppointmentType appointmentType;
    LocalTime  startTime ;
    LocalTime endTime ;
    String serviceId ;
    LocalDate date;

}
