package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.UserResponse;
import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import com.koicenter.koicenterbackend.repository.UserRepository;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VeterinarianService {
    VeterinarianRepository veterinarianRepository;
    UserRepository userRepository;

    //GET Veteriance ID
    public VeterinarianResponse getVeterinarianById ( String veterinarianId){
        Veterinarian veterinarian=  veterinarianRepository.findById(veterinarianId).orElseThrow(() -> new RuntimeException("Veterinarian not found "));
        VeterinarianResponse veterinarianResponse = new VeterinarianResponse();
        veterinarianResponse.setVet_id(veterinarian.getVet_id());
        veterinarianResponse.setStatus(veterinarian.isStatus());
        veterinarianResponse.setDescription(veterinarian.getDescription());
        veterinarianResponse.setGoogle_meet(veterinarian.getGoogle_meet());
        veterinarianResponse.setPhone(veterinarian.getPhone());
        veterinarianResponse.setUser_id(veterinarian.getUser().getUser_id());

        User user = userRepository.findById(veterinarian.getUser().getUser_id()).orElseThrow(() -> new RuntimeException("User not found "));
        UserResponse userResponse = new UserResponse();
        userResponse.setUser_id(user.getUser_id());
        userResponse.setFull_name(user.getFull_name());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setStatus(user.isStatus());
        userResponse.setRole(user.getRole());
        veterinarianResponse.setUserResponse(userResponse);
        return veterinarianResponse ;
    }
}