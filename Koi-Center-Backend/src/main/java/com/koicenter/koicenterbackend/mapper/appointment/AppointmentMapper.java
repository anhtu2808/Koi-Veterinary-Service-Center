package com.koicenter.koicenterbackend.mapper.appointment;

import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.request.appointment.AppointmentRequest;
import com.koicenter.koicenterbackend.model.response.appointment.AppointmentResponse;
import com.koicenter.koicenterbackend.model.response.koi.KoiResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    @Mapping( target = "customer",ignore = true)
    @Mapping( target = "veterinarian",ignore = true)
    @Mapping(target = "service" , ignore = true)
    @Mapping(target = "depositedMoney", ignore = true)
    Appointment toAppointment(AppointmentRequest appointmentRequest);

    @Mapping( target = "customerId",ignore = true)
    @Mapping( target = "serviceId",ignore = true)
    @Mapping(target = "vetId" , ignore = true)
    AppointmentResponse toAppointmentResponse(Appointment appointment);


}
