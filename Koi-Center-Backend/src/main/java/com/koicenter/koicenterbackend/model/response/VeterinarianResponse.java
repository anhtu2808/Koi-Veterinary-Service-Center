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
    private String vetId;            // Mapped from `vet_id` in Veterinarian
    private String Vetstatus;          // Mapped from `status` in Veterinarian
    private String description;      // Mapped from `description` in Veterinarian
    private String googleMeet;       // Mapped from `google_meet` in Veterinarian
    private String phone;            // Mapped from `phone` in Veterinarian
    private String imageVeterinarian;
String userId ;

    UserResponse user;


}
