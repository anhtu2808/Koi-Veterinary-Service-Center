    package com.koicenter.koicenterbackend.service;
    import com.koicenter.koicenterbackend.model.entity.User;
    import com.koicenter.koicenterbackend.model.entity.Veterinarian;
    import com.koicenter.koicenterbackend.model.enums.Role;
    import com.koicenter.koicenterbackend.model.enums.VeterinarianStatus;
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
            veterinarianResponse.setVetStatus(veterinarian.getVeterinarianStatus().toString());
            veterinarianResponse.setDescription(veterinarian.getDescription());
            veterinarianResponse.setGoogleMeet(veterinarian.getGoogleMeet());
            veterinarianResponse.setPhone(veterinarian.getPhone());
            veterinarianResponse.setUserId(veterinarian.getUser().getUserId());

            User user = userRepository.findById(veterinarian.getUser().getUserId()).orElseThrow(() -> new RuntimeException("User not found "));
            UserResponse userResponse = new UserResponse();
            userResponse.setUser_id(user.getUserId());
            userResponse.setFull_name(user.getFullName());
            userResponse.setUsername(user.getUsername());
            userResponse.setEmail(user.getEmail());
            userResponse.setStatus(user.isStatus());
            userResponse.setRole(user.getRole());

            veterinarianResponse.setUser(userResponse);
            return veterinarianResponse ;
        }

    public List<VeterinarianResponse> getAllVet() {
        List<Object[]> list = veterinarianRepository.findAllVet();
        List<VeterinarianResponse> responseList = new ArrayList<>();

        for (Object[] objects : list) {
            try {
                UserResponse userResponse = UserResponse.builder()
                        .user_id(objects[0].toString())
                        .role(Role.valueOf(objects[1].toString())) // Sửa chỉ số để lấy vai trò
                        .status((Boolean) objects[2]) // Sửa chỉ số để lấy trạng thái
                        .username(objects[3].toString())
                        .email(objects[4].toString())
                        .full_name(objects[5].toString())
                        .build();


                VeterinarianResponse veterinarianResponse = VeterinarianResponse.builder()
                        .vetId(objects[6].toString())
                        .description(objects[7].toString())
                        .googleMeet(objects[8].toString())
                        .phone(objects[9].toString())
                        .imageVeterinarian(objects[10]!= null ? objects[10].toString() : null)
                        .vetStatus(String.valueOf(VeterinarianStatus.valueOf(objects[11].toString())))
                        .user(userResponse)
                        .build();


                responseList.add(veterinarianResponse);
            } catch (Exception e) {
                log.error("Error processing  in veterinarianService this is Query data: {}", e.getMessage());
            }
        }
        return responseList;
    }

}


