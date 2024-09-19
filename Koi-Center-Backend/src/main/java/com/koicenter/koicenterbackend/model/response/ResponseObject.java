package com.koicenter.koicenterbackend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseObject {
    String status;
    String message;
    Object data;



    public static ResponseEntity<ResponseObject> APIRepsonse(String status, String message, HttpStatus httpStatus, Object data) {
        return ResponseEntity.status(httpStatus).body(
                new ResponseObject(status, message, data)
        );
    }
}

