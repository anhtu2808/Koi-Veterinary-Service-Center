package com.koicenter.koicenterbackend.exception;

import org.springframework.http.HttpStatus;

public class AppException extends RuntimeException {

    private String errorCode;
    private String message;
    private HttpStatus httpStatus; // Add HttpStatus field

    // Update constructor to include HttpStatus
    public AppException(String errorCode, String message, HttpStatus httpStatus) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
        this.httpStatus = httpStatus; // Set the HttpStatus
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus; // Getter for HttpStatus
    }
}
