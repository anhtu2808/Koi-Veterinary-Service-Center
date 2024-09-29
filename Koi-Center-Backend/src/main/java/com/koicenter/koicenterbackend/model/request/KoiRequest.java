package com.koicenter.koicenterbackend.model.request;

import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.KoiTreatment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
public class KoiRequest {
    String koiId;
    String breed;
    int age;
    float height;
    float weight;
    String healthStatus;
    String notes;
    String image;
    Customer customer;
    List<KoiTreatment> koiTreatments;

}
