package com.koicenter.koicenterbackend.model.response.staff;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StaffDTO {
    String staffId;
    String phone;
    String image;
    String status;
    double salary;
    String address;
    Date hireDate;

}
