package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.mapper.UserMapper;
import com.koicenter.koicenterbackend.mapper.VetScheduleMapper;
import com.koicenter.koicenterbackend.mapper.VeterinariansMapper;
import com.koicenter.koicenterbackend.model.entity.VetSchedule;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import com.koicenter.koicenterbackend.model.enums.StatusVetSchedule;
import com.koicenter.koicenterbackend.model.request.veterinarian.VetScheduleRequest;
import com.koicenter.koicenterbackend.model.response.schedual.DayResponse;
import com.koicenter.koicenterbackend.model.response.schedual.SlotResponse;
import com.koicenter.koicenterbackend.model.response.veterinarian.VetScheduleResponse;
import com.koicenter.koicenterbackend.model.response.veterinarian.VeterinarianResponse;
import com.koicenter.koicenterbackend.repository.ScheduleRepository;
import com.koicenter.koicenterbackend.repository.UserRepository;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VetScheduleService {
    //Schedule ID and Type : CENTER ,HOME ,MObile
    ScheduleRepository scheduleRepository;
    VeterinarianRepository veterinarianRepository;
    VeterinarianService veterinarianService;
    VetScheduleMapper vetScheduleMapper;
    VeterinariansMapper veterinariansMapper;
    UserRepository userRepository;
    UserMapper userMapper;

    public List<DayResponse> getScheduleForBooking(VetScheduleRequest vetSchedule) {
        List<VetScheduleResponse> vetSchedules = new ArrayList<>();
        List<DayResponse> dayResponses = new ArrayList<>();
        List<LocalDate> allDay = new ArrayList<>();

        List<VetSchedule> vetSchedule1 = new ArrayList<>();
        if (vetSchedule.getVet_id().equals("SKIP")) { // KHONG CHON BAC SI
            vetSchedule1 = scheduleRepository.findAll();
        } else { // O DAY CO CHON BAC SI
            vetSchedule1 = scheduleRepository.findByVeterinarianVetId(vetSchedule.getVet_id());

        }
        for (VetSchedule ngay : vetSchedule1) {  // lay het ngày ra truoc da
            LocalDate localDate = ngay.getDate();
            if (!allDay.contains(localDate)) {
                allDay.add(localDate);          // lấy hết ngày ra
            }
        }
        String type = vetSchedule.getAppointmentType().toString().toUpperCase();
        if (vetSchedule.getAppointmentType().toString().equals("CENTER") || vetSchedule.getAppointmentType().toString().equals("ONLINE")) {
            for (LocalDate localDate : allDay) { // ngay hom do
                DayResponse dates = new DayResponse();
                List<SlotResponse> slotResponsesList = new ArrayList<>();
                for (VetSchedule vetScheduleEntry : vetSchedule1) {
                    if (vetScheduleEntry.getDate().equals(localDate) && vetScheduleEntry.getCustomerBookingCount() < 2) { // ngay va so luong khach da dăt
                        SlotResponse slotResponse = new SlotResponse();
                        slotResponse.setStartTime(vetScheduleEntry.getStartTime());
                        slotResponse.setEndTime(vetScheduleEntry.getEndTime());
                        slotResponsesList.add(slotResponse);
                    }
                }
                if (!slotResponsesList.isEmpty()) {
                    dates.setDay(localDate);
                    dates.setSlots(slotResponsesList);
                    dayResponses.add(dates);
                }
            }
        } else if (vetSchedule.getAppointmentType().toString().toLowerCase().equalsIgnoreCase(AppointmentType.HOME.toString().toLowerCase())) {
            // Logic xử lý cho loại hẹn MOBILE nếu cần
            for (LocalDate localDate : allDay) {
                DayResponse dates = new DayResponse();
                List<SlotResponse> slotResponsesList = new ArrayList<>();
                int slotMorning = 0;
                int slotAfternoon = 0;
                for (VetSchedule vetScheduleEntry : vetSchedule1) {
                    if (vetScheduleEntry.getDate().equals(localDate) && vetScheduleEntry.getCustomerBookingCount() == 0) {

                        if (vetScheduleEntry.getStartTime().getHour() >= 7 && vetScheduleEntry.getStartTime().getHour() < 12) {
                            slotMorning++; // kiem tra buoi sang
                        }
                        if (vetScheduleEntry.getEndTime().getHour() >= 13 && vetScheduleEntry.getEndTime().getHour() < 18) {
                            slotAfternoon++;
                        }
                    }
                }
                if (slotMorning >= 4) {
                    SlotResponse morningSlot = new SlotResponse();
                    morningSlot.setStartTime(LocalTime.parse("07:00:00"));
                    morningSlot.setEndTime(LocalTime.parse("11:00:00"));
                    slotResponsesList.add(morningSlot);
                }
                if (slotAfternoon >= 4) {
                    SlotResponse afternoonSlot = new SlotResponse();
                    afternoonSlot.setStartTime(LocalTime.parse("13:00:00"));
                    afternoonSlot.setEndTime(LocalTime.parse("17:00:00"));
                    slotResponsesList.add(afternoonSlot);
                }
                if (!slotResponsesList.isEmpty()) {
                    dates.setDay(localDate);
                    dates.setSlots(slotResponsesList);
                    dayResponses.add(dates);
                }
            }
        }

        return dayResponses;
    }

    //    public List<VetScheduleResponse> getVeterinariansByDateTime(VetScheduleRequest localDate) {
//        List<VetScheduleResponse> vetSchedules = new ArrayList<>();
//
//    }
    public List<VeterinarianResponse> getVeterinariansByDateTime(VetScheduleRequest vetScheduleRequest) {


        // Service Id , Date ,starTime , endTime type
        List<VeterinarianResponse> veterinarians = new ArrayList<>();
        List<VeterinarianResponse> veterinarianResponses = veterinarianService.getVeterinariansByServiceId(vetScheduleRequest.getServiceId());
        List<VetScheduleResponse> vetScheduleResponses = new ArrayList<>();
        List<VetSchedule> vetSchedules = new ArrayList<>();
        for (VeterinarianResponse vetResponse : veterinarianResponses) {
            List<VetSchedule> vetSchedule = new ArrayList<>();
            vetSchedule = scheduleRepository.findByVeterinarianVetId(vetResponse.getVetId());
            for (VetSchedule vet1 : vetSchedule) {
                vetScheduleResponses.add(vetScheduleMapper.toVetScheduleResponse(vet1));
            }
        }
        for (VetScheduleResponse vetScheduleResponse : vetScheduleResponses) {
            if (vetScheduleRequest.getAppointmentType().toString().equals("CENTER") || vetScheduleRequest.getAppointmentType().toString().equals("ONLINE")) {
                if (vetScheduleRequest.getStartTime().equals(vetScheduleResponse.getStart_time()) && vetScheduleRequest.getEndTime().equals(vetScheduleResponse.getEnd_time()) && vetScheduleRequest.getDate().equals(vetScheduleResponse.getDate()) && vetScheduleResponse.getCustomerBookingCount() < 2) {

                    Veterinarian veterinarian = veterinarianRepository.findById(vetScheduleResponse.getVet_Id()).orElseThrow(() -> new RuntimeException("Veterinarian not found "));
                    VeterinarianResponse response = new VeterinarianResponse();
                    response = veterinariansMapper.toVeterinarianResponse(veterinarian);
                    response.setUser(userMapper.toUserResponse(veterinarian.getUser()));
                    veterinarians.add(response);


                }
            } else if (vetScheduleRequest.getAppointmentType().toString().toLowerCase().equalsIgnoreCase(AppointmentType.HOME.toString().toLowerCase())) {
                if (vetScheduleRequest.getStartTime().equals(vetScheduleResponse.getStart_time()) && vetScheduleRequest.getEndTime().equals(vetScheduleResponse.getEnd_time()) && vetScheduleRequest.getDate().equals(vetScheduleResponse.getDate()) && vetScheduleResponse.getCustomerBookingCount() == 0) {

                    Veterinarian veterinarian = veterinarianRepository.findById(vetScheduleResponse.getVet_Id()).orElseThrow(() -> new RuntimeException("Veterinarian not found "));
                    VeterinarianResponse response = new VeterinarianResponse();
                    response = veterinariansMapper.toVeterinarianResponse(veterinarian);
                    response.setUser(userMapper.toUserResponse(veterinarian.getUser()));
                    veterinarians.add(response);
                }
            }
        }
        return veterinarians;
    }

    public VetScheduleResponse SlotDateTime(VetScheduleRequest vetScheduleRequest, int count) { // cái này là cái Update
//        log.info("VETID " + vetScheduleRequest.getVet_id() +
//                "/n STAR " + vetScheduleRequest.getStartTime()+
//                "/n END" +vetScheduleRequest.getEndTime() +
//                "/n date " + vetScheduleRequest.getDate());
        VetSchedule findID = scheduleRepository.findVetSchedule(vetScheduleRequest.getVet_id(), vetScheduleRequest.getStartTime(), vetScheduleRequest.getEndTime(), vetScheduleRequest.getDate());
//        log.info("SCHEDULEID " + findID.getScheduleId() +
//                "VETID " + findID.getVeterinarian().getVetId() +
//                "/n STAR " + findID.getStartTime()+
//                "/n END" +findID.getEndTime() +
//                "/n date " + findID.getDate());
        if (findID != null) {

            int number = findID.getCustomerBookingCount() + count;
            findID.setCustomerBookingCount(number);
            if (number == 2) {
                findID.setStatus(StatusVetSchedule.AVAILABLE);
            } else if (number == 1) {
                findID.setStatus(StatusVetSchedule.PROCESS);
            }
            scheduleRepository.save(findID);
            VetScheduleResponse vetScheduleResponse = vetScheduleMapper.toVetScheduleResponse(findID);

            return vetScheduleResponse;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "VetSchedule not found");
         }

    }
}



