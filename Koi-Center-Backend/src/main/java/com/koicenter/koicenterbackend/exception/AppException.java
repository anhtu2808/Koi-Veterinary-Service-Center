package com.koicenter.koicenterbackend.exception;

public class AppException extends RuntimeException {

    private String errorCode;
    private String message;

    public AppException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }
}
