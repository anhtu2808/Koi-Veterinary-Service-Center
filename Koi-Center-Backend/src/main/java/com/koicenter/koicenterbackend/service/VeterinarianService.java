package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;

import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.model.response.UserResponse;
import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import com.koicenter.koicenterbackend.repository.UserRepository;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VeterinarianService {
    @Autowired
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
