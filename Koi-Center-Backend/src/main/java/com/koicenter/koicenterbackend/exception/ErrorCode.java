package com.koicenter.koicenterbackend.exception;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public enum ErrorCode {
    USER_EXISTED("401","User already existed"),
    INVALID_LOGIN("401","Invalid username or password"),
    INVALID_LOGOUT("401","Logout failed"),
    ;
    private String code;
    private String message;
    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
