package com.koicenter.koicenterbackend.model.response;

import com.koicenter.koicenterbackend.model.enums.AppointmentStatus;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AppointmentResponse {
     String appointmentId;
     LocalDate appointmentDate;
     ZonedDateTime createdAt;
     double depositedMoney;
     LocalTime endTime;
     String location;
     String result;
     LocalTime startTime;
     AppointmentStatus status;
     AppointmentType type;
     String customerId;
     String serviceId;
     String vetId;
}
