
package com.koicenter.koicenterbackend.exception;

import com.koicenter.koicenterbackend.model.response.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ResponseObject> handleAppException(AppException ex) {
        ResponseObject response = new ResponseObject(ex.getErrorCode(), ex.getMessage(), null);
        return ResponseObject.APIRepsonse(ex.getErrorCode(), ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseObject> handleGeneralException(Exception ex) {
        return ResponseObject.APIRepsonse("500", "An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR, null);
    }
}
