package com.koicenter.koicenterbackend.model.response.invoice;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.*;

@Data

@FieldDefaults(level = AccessLevel.PRIVATE)
public class DashboardResponse {
    float totalRevenue; // tong gia
    int totalKoi ; // tong so luong
    int totalPond ; // tong so luong
    int totalAppointment ; // tong so luong Appointment
    String time ;
    DayOfWeek day ;
    Month month ;
    Year year ;
//    ZonedDateTime date ;
    LocalDate date ;


}
