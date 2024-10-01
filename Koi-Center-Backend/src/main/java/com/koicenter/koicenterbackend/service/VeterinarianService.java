package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.Role;
import com.koicenter.koicenterbackend.model.enums.VeterinarianStatus;
import com.koicenter.koicenterbackend.model.request.veterinarian.VeterinarianRequest;
import com.koicenter.koicenterbackend.model.response.veterinarian.VeterinarianResponse;
import com.koicenter.koicenterbackend.model.response.user.UserResponse;
import com.koicenter.koicenterbackend.repository.ServicesRepository;
import com.koicenter.koicenterbackend.repository.UserRepository;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
//import com.koicenter.koicenterbackend.repository.VeterinarianServiceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    ServicesRepository servicesRepository;
    @Autowired
    private UserService userService;

    //GET Veteriance ID
    public VeterinarianResponse getVeterinarianById(String veterinarianId) {
        Veterinarian veterinarian = veterinarianRepository.findById(veterinarianId).orElseThrow(() -> new RuntimeException("Veterinarian not found "));
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
        return veterinarianResponse;
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

                    List<String> serviceNames = veterinarianRepository.findServiceNamesByVetId(veterinarian.getVetId());

                    VeterinarianResponse veterinarianResponse = VeterinarianResponse.builder()
                            .vetId(veterinarian.getVetId())
                            .description(veterinarian.getDescription())
                            .googleMeet(veterinarian.getGoogleMeet())
                            .phone(veterinarian.getPhone())
                            .imageVeterinarian(veterinarian.getImage() != null ? veterinarian.getImage() : null)
                            .vetStatus(veterinarian.getVeterinarianStatus().toString())
                            .serviceNames(serviceNames)
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

    //CREATE VETERINARIAN
    public void createVeterinarian(VeterinarianRequest veterinarianRequest) {
        User newVeterinarian = new User();

        newVeterinarian.setFullName(veterinarianRequest.getUserRequest().getFullname());
        newVeterinarian.setEmail(veterinarianRequest.getUserRequest().getEmail());
        newVeterinarian.setUsername(veterinarianRequest.getUserRequest().getUsername());
        newVeterinarian.setPassword(veterinarianRequest.getUserRequest().getPassword());
        newVeterinarian.setImage(veterinarianRequest.getImage());

        newVeterinarian = userService.createVeterinarian(newVeterinarian);


        Veterinarian veterinarian = new Veterinarian();
        veterinarian.setDescription(veterinarianRequest.getDescription());
        veterinarian.setGoogleMeet(veterinarianRequest.getGoogle_meet());
        veterinarian.setPhone(veterinarianRequest.getPhone());
        veterinarian.setImage(veterinarianRequest.getImage());
        veterinarian.setStatus(veterinarianRequest.getStatus());
        veterinarian.setVeterinarianStatus(VeterinarianStatus.AVAILABLE);
        veterinarian.setUser(newVeterinarian);

        List<com.koicenter.koicenterbackend.model.entity.Service> services = new ArrayList<>();
        for (String service : veterinarianRequest.getService()) {
            services.add(servicesRepository.findByServiceId(service));
        }

        veterinarian.setServices(services);

        veterinarianRepository.save(veterinarian);
    }


    public List<VeterinarianResponse> getVeterinariansByServiceId(String serviceId) {

        List<Veterinarian> veterinarians = veterinarianRepository.findByServices_ServiceId(serviceId);
        if(veterinarians.isEmpty()){
            throw new AppException(404, "Not found", HttpStatus.NOT_FOUND);
        }
        List<VeterinarianResponse> responseList = new ArrayList<>();
        for (Veterinarian veterinarian : veterinarians) {

            VeterinarianResponse veterinarianResponse = new VeterinarianResponse();
            veterinarianResponse.setGoogleMeet(veterinarian.getGoogleMeet());
            veterinarianResponse.setPhone(veterinarian.getPhone());
            veterinarianResponse.setVetId(veterinarian.getVetId());
            veterinarianResponse.setDescription(veterinarian.getDescription());
            veterinarianResponse.setUserId(veterinarian.getUser().getUserId());
            veterinarianResponse.setVetStatus(veterinarian.getVeterinarianStatus() == null? "" : veterinarian.getVeterinarianStatus().toString() );
            veterinarianResponse.setUserId(veterinarian.getUser().getUserId());
                    UserResponse userResponse = new UserResponse();
                    userResponse.setFullName(veterinarian.getUser().getFullName());
                    userResponse.setEmail(veterinarian.getUser().getEmail());
                    userResponse.setUsername(veterinarian.getUser().getUsername());
            veterinarianResponse.setUser(userResponse);
            responseList.add(veterinarianResponse);
        }
        return responseList;
    }
}


