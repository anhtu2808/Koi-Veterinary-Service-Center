package com.koicenter.koicenterbackend.exception;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public enum ErrorCode {
    USER_EXISTED(401,"User already existed"),
    USER_NOT_EXISTS(403,"User not found "),
    INVALID_LOGIN(401,"Invalid username or password"),
    INVALID_LOGOUT(401,"Logout failed"),
    INVALID_TOKEN(401,"Invalid token"),
    SERVICE_NOT_EXITS(401,"Service not exits"),
    POND_NOT_EXITS(401,"Pond not exits"),
    KOI_NOT_EXITS(401,"Koi not exits"),
    POND_ID_OR_APPOINTMENT_ID_NOT_EXITS(401,"Pond id or appointment id not exits"),
    KOI_ID_OR_APPOINTMENT_ID_NOT_EXITS(401,"Pond id or appointment id not exits"),
    MEDICINE_NOT_EXITS(401,"Medicine not exits"),
    CUSTOMER_NOT_EXITS(401,"Customer not exits"),
    CUSTOMER_NOT_FOUND(404,"Customer not found"),
    PRESCRIPTION_MEDICINE_NOT_EXITS(401,"Prescription medicine not exits"),
    DELIVERY_ID_NOT_EXITS(401,"Delivery not exits"),
    SERVICE_ID_NOT_EXITS(401,"Service not exits"),
    VETERINARIAN_ID_NOT_EXITS(401,"Vetterinarian not exits"),
    NO_SCHEDULE_FOUND(401,"No schedule found"),
    PRESCRIPTION_ID_NOT_FOUND(401,"Prescription id not found"),
    PRESCRIPTION_MEDICINE_ID_NOT_FOUND(401,"Prescription medicine id not found"),
    INVOICE_ID_NOT_FOUND(401,"Invoice id not found"),
    APPOINTMENT_ID_NOT_FOUND(404,"Appointment id not found"),
    APPOINTMENT_NOT_FOUND(404,"Appointment not found"),
    STAR_NOT_EXISTS(401,"Star must between 0 to 5 " )
    ;
    private int code;
    private String message;
    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
