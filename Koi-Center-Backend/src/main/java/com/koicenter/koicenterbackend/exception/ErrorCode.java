package com.koicenter.koicenterbackend.exception;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public enum ErrorCode {
    USER_EXISTED(401,"User already existed"),
    INVALID_LOGIN(401,"Invalid username or password"),
    INVALID_LOGOUT(401,"Logout failed"),
    INVALID_TOKEN(401,"Invalid token"),
    SERVICE_NOT_EXITS(401,"Service not exits"),
    POND_NOT_EXITS(401,"Pond not exits"),
    KOI_NOT_EXITS(401,"Koi not exits"),
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
