package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.request.VetScheduleRequest;
import com.koicenter.koicenterbackend.model.response.VetScheduleResponse;
import com.koicenter.koicenterbackend.repository.ScheduleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VetScheduleService {
    //Schedule ID and Type : CENTER ,HOME ,MObile
    ScheduleRepository scheduleRepository;
    public List<VetScheduleResponse> getScheduleForBooking(VetScheduleRequest vetSchedule){
//        if(vetSchedule.getAppointmentType().equals("CENTER")  || vetSchedule.getAppointmentType().equals("ONLINE")){
//
//        }
//        else if (vetSchedule.getAppointmentType().equals("MOBILE")){
//
//        }else {
//
//        }
return null ;
    }
}
