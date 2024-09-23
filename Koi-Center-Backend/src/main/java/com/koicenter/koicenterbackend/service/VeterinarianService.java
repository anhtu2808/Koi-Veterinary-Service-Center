package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VeterinarianService {
    @Autowired
    VeterinarianRepository veterinarianRepository;

    //GET Veteriance ID
    public Veterinarian getVeterinarianById ( String veterinarianId){
        return veterinarianRepository.findById(veterinarianId).orElseThrow(() -> new RuntimeException("Veterinarian not found "));
    }



    public List<VeterinarianResponse> getAllVet() {
        List<Object[]> list = veterinarianRepository.findAllVet();

        List<VeterinarianResponse> responseList = new ArrayList<>();


        for (Object[] objects : list) {
            VeterinarianResponse veterinarianResponse = VeterinarianResponse.builder()
                    .userId(objects[0].toString())
                    .role(objects[2].toString())
                    .userStatus((Boolean) objects[3])
                    .username(objects[4].toString())
                    .email(objects[5].toString())
                    .fullName(objects[6].toString())
                    .vetId(objects[7].toString())
                    .description(objects[8].toString())
                    .googleMeet(objects[9].toString())
                    .phone(objects[10].toString())
                    .imageVeterinarian(objects[12].toString())
                    .Vetstatus(objects[13].toString())
                            .build();


            responseList.add(veterinarianResponse);
        }
        return responseList;
    }



}