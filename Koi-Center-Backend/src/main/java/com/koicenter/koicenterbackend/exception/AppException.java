package com.koicenter.koicenterbackend.exception;

import org.springframework.http.HttpStatus;

public class AppException extends RuntimeException {

    private int errorCode;
    private String message;
    private HttpStatus httpStatus; // Add HttpStatus field

    // Update constructor to include HttpStatus
    public AppException(int errorCode, String message, HttpStatus httpStatus) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
        this.httpStatus = httpStatus; // Set the HttpStatus
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus; // Getter for HttpStatus
    }
}
