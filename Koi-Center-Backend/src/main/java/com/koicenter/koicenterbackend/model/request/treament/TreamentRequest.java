package com.koicenter.koicenterbackend.model.request.treament;

import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TreamentRequest {
    List<String> selected;
    AppointmentRequest appointmentRequest ;
}
