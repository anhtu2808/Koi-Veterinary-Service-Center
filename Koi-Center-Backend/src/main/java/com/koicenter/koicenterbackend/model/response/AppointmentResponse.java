package com.koicenter.koicenterbackend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AppointmentResponse {
     String appointmentId;
     String appointmentDate;
     String createdAt;
     double depositedMoney;
     String endTime;
     String location;
     String result;
     String startTime;
     String status;
     String type;
     String customerId;
     String serviceId;
     String vetId;
}
