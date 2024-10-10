package com.koicenter.koicenterbackend.model.request.veterinarian;

import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Builder
public class VetScheduleRequest {
    String vet_id ;
    String schedule_id ;
    AppointmentType appointmentType;
    LocalTime startTime ;
    LocalTime endTime ;
    String serviceId ;
    LocalDate date;
    int customerBookingCount;
    List<LocalDate> dates ;


}
