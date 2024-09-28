package com.koicenter.koicenterbackend.service;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.Role;
import com.koicenter.koicenterbackend.model.response.VeterinarianResponse;
import com.koicenter.koicenterbackend.model.response.UserResponse;
import com.koicenter.koicenterbackend.repository.UserRepository;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
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
        veterinarianResponse.setVetId(veterinarian.getVetId());
        veterinarianResponse.setVetStatus(veterinarian.getStatus());
        veterinarianResponse.setDescription(veterinarian.getDescription());
        veterinarianResponse.setGoogleMeet(veterinarian.getGoogleMeet());
        veterinarianResponse.setPhone(veterinarian.getPhone());
        veterinarianResponse.setUserId(veterinarian.getUser().getUserId());

        User user = userRepository.findById(veterinarian.getUser().getUserId()).orElseThrow(() -> new RuntimeException("User not found "));
        UserResponse userResponse = new UserResponse();
        userResponse.setUser_id(user.getUserId());
        userResponse.setFullName(user.getFullName());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setStatus(user.isStatus());
        userResponse.setRole(user.getRole());

        veterinarianResponse.setUser(userResponse);
        return veterinarianResponse ;
    }

    public List<VeterinarianResponse> getAllVet() {
        List<User> users = userRepository.findByRole(Role.VETERINARIAN);
        List<VeterinarianResponse> responseList = new ArrayList<>();
        for (User user : users) {

                try {
                    Veterinarian veterinarian = veterinarianRepository.findByUserId(user.getUserId());
                    if (veterinarian != null) {
                        UserResponse userResponse = UserResponse.builder()
                                .user_id(user.getUserId())
                                .role(user.getRole())
                                .status(user.isStatus())
                                .username(user.getUsername())
                                .email(user.getEmail())
                                .fullName(user.getFullName())
                                .build();

                        VeterinarianResponse veterinarianResponse = VeterinarianResponse.builder()
                                .vetId(veterinarian.getVetId())
                                .description(veterinarian.getDescription())
                                .googleMeet(veterinarian.getGoogleMeet())
                                .phone(veterinarian.getPhone())
                                .imageVeterinarian(veterinarian.getImage() != null ? veterinarian.getImage() : null)
                                .vetStatus(veterinarian.getVeterinarianStatus().toString())
                                .user(userResponse)
                                .build();
                        responseList.add(veterinarianResponse);
                    }
                } catch (Exception e) {
                    log.error("Error while retrieving Veterinarian: {}", e.getMessage());
                }
        }
        return responseList;
    }

}


