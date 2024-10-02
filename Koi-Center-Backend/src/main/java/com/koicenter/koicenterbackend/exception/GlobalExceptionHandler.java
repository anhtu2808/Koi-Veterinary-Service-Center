

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
        return ResponseObject.APIRepsonse(ex.getErrorCode(), ex.getMessage(), HttpStatus.UNAUTHORIZED, null);
    }
}

