package com.koicenter.koicenterbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@Setter
@Getter
@NoArgsConstructor
public class GoogleUserInfo {

    public boolean email_verified;
    public String given_name;
    public String picture;
    public String name;
    public String family_name;
    public String email;
}