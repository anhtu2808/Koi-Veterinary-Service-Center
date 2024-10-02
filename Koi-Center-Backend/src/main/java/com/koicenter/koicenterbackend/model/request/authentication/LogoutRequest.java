package com.koicenter.koicenterbackend.model.request.authentication;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
public class LogoutRequest {
    String token;
}
