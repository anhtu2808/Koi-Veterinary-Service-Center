package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Appointment;
import com.koicenter.koicenterbackend.model.entity.Invoice;
import com.koicenter.koicenterbackend.model.entity.KoiTreatment;
import com.koicenter.koicenterbackend.model.entity.PondTreatment;
import com.koicenter.koicenterbackend.model.request.invoice.InvoiceRequest;
import com.koicenter.koicenterbackend.model.response.invoice.DashboardResponse;
import com.koicenter.koicenterbackend.model.response.invoice.InvoiceResponse;
import com.koicenter.koicenterbackend.repository.AppointmentRepository;
import com.koicenter.koicenterbackend.repository.InvoiceRepository;
import com.koicenter.koicenterbackend.repository.KoiTreatmentRepository;
import com.koicenter.koicenterbackend.repository.PondTreatmentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.customizers.SpecPropertiesCustomizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.time.Year;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvoiceService {
    InvoiceRepository invoiceRepository;
    AppointmentRepository appointmentRepository ;
    KoiTreatmentRepository koiTreatmentRepository;
    PondTreatmentRepository pondTreatmentRepository;
    private final CreateOrderMoMo createOrderMoMo;


    public InvoiceResponse getInvoiceByAppointmentId(String appointmentId) {
        Invoice invoice = invoiceRepository.findByAppointment_AppointmentId(appointmentId);
        return InvoiceResponse.builder()
                .updateDate(invoice.getUpdatDate())
                .totalPrice(invoice.getTotalPrice())
                .paymentStatus(invoice.isPaymentStatus())
                .createAt(invoice.getCreateAt())
                .invoiceId(invoice.getInvoiceId())
                .build();
    }
    public InvoiceResponse updateInvoice(String invoiceId , InvoiceRequest invoiceRequest) {
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(() -> new AppException(
                ErrorCode.INVOICE_ID_NOT_FOUND.getCode(),
                ErrorCode.INVOICE_ID_NOT_FOUND.getMessage(),
                HttpStatus.NOT_FOUND));
        Appointment appointment = appointmentRepository.findById(invoiceRequest.getAppointmentId()).orElseThrow(() -> new AppException(
                ErrorCode.APPOINTMENT_ID_NOT_FOUND.getCode(),
                ErrorCode.APPOINTMENT_ID_NOT_FOUND.getMessage()
                , HttpStatus.NOT_FOUND));
        if(invoiceRequest.getCreateAt()!=null){
        invoice.setCreateAt(invoiceRequest.getCreateAt());
        }
        if(invoiceRequest.getUpdateDate()!=null){
            invoice.setUpdatDate(invoiceRequest.getUpdateDate());
        }
        invoice.setTotalPrice(invoiceRequest.getTotalPrice());
        invoice.setPaymentStatus(invoiceRequest.isPaymentStatus());
        invoice.setAppointment(appointment);

        invoiceRepository.save(invoice);
        return InvoiceResponse.builder()
                .updateDate(invoice.getUpdatDate())
                .totalPrice(invoice.getTotalPrice())
                .paymentStatus(invoice.isPaymentStatus())
                .createAt(invoice.getCreateAt())
                .invoiceId(invoice.getInvoiceId())
                .build();
    }
    public List<DashboardResponse> getDashBoardByTime(String time ){
        List<DashboardResponse> dashboardResponse = new ArrayList<>();
        if(time.toUpperCase().equals("DAY")){
            Appointment appointment = appointmentRepository.findAllByOrderByCreatedAtDesc().stream().findFirst().orElseThrow(() -> new AppException(
                    ErrorCode.APPOINTMENT_NOT_FOUND.getCode(),
                    ErrorCode.APPOINTMENT_NOT_FOUND.getMessage(),
                    HttpStatus.NOT_FOUND));
            ZonedDateTime createdAt = appointment.getCreatedAt() ;
            List<Appointment> appointmentList = new ArrayList<>();
            for (int i  = 0; i < 7 ; i++ ){ // cua 1 ngay
                int countAppointment = 0 ;
                int countKoi = 0 ;
                int countPond = 0 ;
                int totalPrice = 0 ;
                ZonedDateTime specificDate = createdAt.minusDays(i);
                ZonedDateTime startOfDay = specificDate.toLocalDate().atStartOfDay(specificDate.getZone());
                ZonedDateTime endOfDay = startOfDay.plusDays(1); // Thêm 1 ngày để có được ngày kết thúc
                log.info("StarOfDay :" + startOfDay.getDayOfWeek());
                log.info("endOfDay :" + endOfDay);
                List<Appointment> appointment1 = appointmentRepository.findByCreatedAtBetween(startOfDay,endOfDay);
                DashboardResponse dashboardResponse1 = new DashboardResponse();
                dashboardResponse1.setDay(startOfDay.getDayOfWeek());
                dashboardResponse1.setDate(startOfDay.toLocalDate());
                for (Appointment appointment2 : appointment1){
                    countAppointment ++ ; // bao nhieu appointment trong 1 ngay
                    List<KoiTreatment> koiTreatments = koiTreatmentRepository.findKoiTreatmentsByAppointment_AppointmentId(appointment2.getAppointmentId());
                    if(koiTreatments != null){
                        for (KoiTreatment koiTreatment : koiTreatments){
                            countKoi ++ ; //  tung Koi of Appointment
                        }
                    }
                    List<PondTreatment> pondTreatments = pondTreatmentRepository.findPondTreatmentsByAppointment_AppointmentId(appointment2.getAppointmentId());
                    if(pondTreatments != null){
                        for (PondTreatment pondTreatment : pondTreatments){
                            countPond++ ; // tung Pond of Appointment
                        }
                    }
                    Invoice invoices = invoiceRepository.findByAppointment_AppointmentId(appointment2.getAppointmentId());
                    if(invoices != null){
                        totalPrice += invoices.getTotalPrice();
                    }
                }
                dashboardResponse1.setTotalRevenue(totalPrice);
                dashboardResponse1.setTotalKoi(countKoi);
                dashboardResponse1.setTotalPond(countPond);
                dashboardResponse1.setTotalAppointment(countAppointment);
                //het 1 ngay
                dashboardResponse.add(dashboardResponse1);
            }
        }
        else if(time.equals("month")){
            Appointment appointment = appointmentRepository.findAllByOrderByCreatedAtDesc().stream().findFirst().orElseThrow(() -> new AppException(
                    ErrorCode.APPOINTMENT_NOT_FOUND.getCode(),
                    ErrorCode.APPOINTMENT_NOT_FOUND.getMessage(),
                    HttpStatus.NOT_FOUND));
            log.info("month" + appointment.getCreatedAt().getMonth());
            ZonedDateTime createAt = appointment.getCreatedAt() ;
            for (int i = 0 ; i<6 ; i++){
                int countAppointment = 0 ;
                int countKoi = 0 ;
                int countPond = 0 ;
                int totalPrice = 0 ;
                DashboardResponse dashboardResponse1 = new DashboardResponse();
                ZonedDateTime createdAt = createAt.minusMonths(i);
                Month month = createdAt.getMonth();
                log.info("Month :" + month);
                dashboardResponse1.setMonth(month);

                List<Appointment> appointmentsListMonth = appointmentRepository.findByCreatedAtMonth(createdAt.getMonthValue());
                for (Appointment appointment1 : appointmentsListMonth){
                    countAppointment ++ ; // bao nhieu appointment trong 1 ngay
                    List<KoiTreatment> koiTreatments = koiTreatmentRepository.findKoiTreatmentsByAppointment_AppointmentId(appointment1.getAppointmentId());
                    if(koiTreatments != null){
                        for (KoiTreatment koiTreatment : koiTreatments){
                            countKoi ++ ; //  tung Koi of Appointment
                        }
                    }
                    List<PondTreatment> pondTreatments = pondTreatmentRepository.findPondTreatmentsByAppointment_AppointmentId(appointment1.getAppointmentId());
                    if(pondTreatments != null){
                        for (PondTreatment pondTreatment : pondTreatments){
                            countPond++ ; // tung Pond of Appointment
                        }
                    }
                    Invoice invoices = invoiceRepository.findByAppointment_AppointmentId(appointment1.getAppointmentId());
                    if(invoices != null){
                        totalPrice += invoices.getTotalPrice();
                    }
                }
                dashboardResponse1.setTotalRevenue(totalPrice);
                dashboardResponse1.setTotalKoi(countKoi);
                dashboardResponse1.setTotalPond(countPond);
                dashboardResponse1.setTotalAppointment(countAppointment);
                //het 1 ngay
                dashboardResponse.add(dashboardResponse1);
                }
            }
        else if(time.equals("year")){
            Appointment appointment = appointmentRepository.findAllByOrderByCreatedAtDesc().stream().findFirst().orElseThrow(() -> new AppException(
                    ErrorCode.APPOINTMENT_NOT_FOUND.getCode(),
                    ErrorCode.APPOINTMENT_NOT_FOUND.getMessage(),
                    HttpStatus.NOT_FOUND));
            ;
            ZonedDateTime createAt = appointment.getCreatedAt() ;
            for (int i = 0 ; i<3 ; i++){
                int countAppointment = 0 ;
                int countKoi = 0 ;
                int countPond = 0 ;
                int totalPrice = 0 ;
                DashboardResponse dashboardResponse1 = new DashboardResponse();
                ZonedDateTime createdAt = createAt.minusYears(i);
                Year year = Year.of(createdAt.getYear());
                log.info("Year :" + year);
                dashboardResponse1.setYear(year);
                dashboardResponse1.setTime(createdAt.toString());
                dashboardResponse1.setDate(createdAt.toLocalDate());
                List<Appointment> appointmentsListYear = appointmentRepository.findByCreatedAtYear(createdAt.getYear());
                for (Appointment appointment1 : appointmentsListYear){
                    countAppointment ++ ; // bao nhieu appointment trong 1 ngay
                    List<KoiTreatment> koiTreatments = koiTreatmentRepository.findKoiTreatmentsByAppointment_AppointmentId(appointment1.getAppointmentId());
                    if(koiTreatments != null){
                        for (KoiTreatment koiTreatment : koiTreatments){
                            countKoi ++ ; //  tung Koi of Appointment
                        }
                    }
                    List<PondTreatment> pondTreatments = pondTreatmentRepository.findPondTreatmentsByAppointment_AppointmentId(appointment1.getAppointmentId());
                    if(pondTreatments != null){
                        for (PondTreatment pondTreatment : pondTreatments){
                            countPond++ ; // tung Pond of Appointment
                        }
                    }
                    Invoice invoices = invoiceRepository.findByAppointment_AppointmentId(appointment1.getAppointmentId());
                    if(invoices != null){
                        totalPrice += invoices.getTotalPrice();
                    }
                }
                dashboardResponse1.setTotalRevenue(totalPrice);
                dashboardResponse1.setTotalKoi(countKoi);
                dashboardResponse1.setTotalPond(countPond);
                dashboardResponse1.setTotalAppointment(countAppointment);
                //het 1 ngay
                dashboardResponse.add(dashboardResponse1);
            }
        }



            return dashboardResponse ;
    }

}
