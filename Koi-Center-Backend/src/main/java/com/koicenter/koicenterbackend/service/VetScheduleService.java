package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.entity.VetSchedule;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.AppointmentType;
import com.koicenter.koicenterbackend.model.request.VetScheduleRequest;
import com.koicenter.koicenterbackend.model.response.DayResponse;
import com.koicenter.koicenterbackend.model.response.SlotResponse;
import com.koicenter.koicenterbackend.model.response.VetScheduleResponse;
import com.koicenter.koicenterbackend.repository.ScheduleRepository;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VetScheduleService {
    //Schedule ID and Type : CENTER ,HOME ,MObile
    ScheduleRepository scheduleRepository;
    VeterinarianRepository veterinarianRepository;

    public List<DayResponse> getScheduleForBooking(VetScheduleRequest vetSchedule) {
        List<VetScheduleResponse> vetSchedules = new ArrayList<>();
        List<DayResponse> dayResponses = new ArrayList<>();
        List<LocalDate> allDay = new ArrayList<>();

        List<VetSchedule> vetSchedule1  = new ArrayList<>();
        if (vetSchedule.getVet_id().equals("SKIP")) { // KHONG CHON BAC SI
            vetSchedule1 = scheduleRepository.findAll();
        }
        else { // O DAY CO CHON BAC SI
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
                    if (vetScheduleEntry.getDate().equals(localDate) && vetScheduleEntry.getCustomerBookingCount() == 0 ) {

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
}
