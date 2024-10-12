package com.koicenter.koicenterbackend.model.request.appointment;

import com.koicenter.koicenterbackend.model.enums.AppointmentStatus;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class AppointmentRequest {
    String appointmentId;
    LocalDate appointmentDate;
    ZonedDateTime createdAt;
    float depositedMoney;
    LocalTime endTime;
    String location;
    String result;
    LocalTime startTime;
    AppointmentStatus status;
    AppointmentType type;
    String customerId;
    String customerName;
    String serviceId;
    String serviceName;
    String vetId;
    float distance ;
String code ;


}
