package com.koicenter.koicenterbackend.model.request.veterinarian;

import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

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
    int customerBookingCount;


}
