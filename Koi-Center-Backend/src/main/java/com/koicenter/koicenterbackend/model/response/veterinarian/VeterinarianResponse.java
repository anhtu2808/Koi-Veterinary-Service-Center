package com.koicenter.koicenterbackend.model.response.veterinarian;



import com.koicenter.koicenterbackend.model.response.user.UserResponse;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VeterinarianResponse {

     String vetId;
     String vetStatus;
     String description;
     String googleMeet;
     String phone;
     String imageVeterinarian;
     String userId ;
    List<String> serviceNames;
    UserResponse user;


}
