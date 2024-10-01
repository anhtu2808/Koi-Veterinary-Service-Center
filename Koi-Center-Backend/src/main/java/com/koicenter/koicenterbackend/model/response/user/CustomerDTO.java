package com.koicenter.koicenterbackend.model.response.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerDTO {
    String customerId;
    String address;
    String phone;
    String image;
}
