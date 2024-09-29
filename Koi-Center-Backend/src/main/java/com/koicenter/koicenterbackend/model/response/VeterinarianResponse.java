package com.koicenter.koicenterbackend.model.response;



import com.koicenter.koicenterbackend.model.enums.VeterinarianStatus;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VeterinarianResponse {
     String vetId;            // Mapped from `vet_id` in Veterinarian
     VeterinarianStatus vetStatus;          // Mapped from `status` in Veterinarian
     String description;      // Mapped from `description` in Veterinarian
     String googleMeet;       // Mapped from `google_meet` in Veterinarian
     String phone;            // Mapped from `phone` in Veterinarian
     String imageVeterinarian;
    String userId ;
    UserResponse user;


}
