package com.koicenter.koicenterbackend.model.request.treament;

import com.koicenter.koicenterbackend.model.enums.ServiceType;
import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.request.pond.SelectedPond;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RequestBody;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TreamentRequest {
    SelectedPond selectedPond  ;
    AppointmentRequest appointmentRequest ;
}
