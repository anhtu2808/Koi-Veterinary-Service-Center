package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeterinarianService {
    @Autowired
    VeterinarianRepository veterinarianRepository;

    //GET Veteriance ID
    public Veterinarian getVeterinarianById ( String veterinarianId){
        return veterinarianRepository.findById(veterinarianId).orElseThrow(() -> new RuntimeException("Veterinarian not found "));
    }

    public List getAllVet() {
        return veterinarianRepository.findAllVet();
    }

}