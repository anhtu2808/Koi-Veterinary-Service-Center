package com.koicenter.koicenterbackend.model.request;

import com.koicenter.koicenterbackend.model.entity.Appointment;
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
}
