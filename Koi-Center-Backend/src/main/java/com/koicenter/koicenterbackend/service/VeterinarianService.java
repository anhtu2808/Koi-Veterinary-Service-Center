package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.request.VeterinarianRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
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
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VeterinarianService {
    VeterinarianRepository veterinarianRepository;

    //GET Veteriance ID
    public Veterinarian getVetID(VeterinarianRequest veterinarianID) {
        var veterinarian = veterinarianRepository.findById(veterinarianID.getVet_id());
        Veterinarian veterinarian1 = new Veterinarian();
        veterinarian1.setVet_id(veterinarian.get().getVet_id());
        veterinarian1.setServices(veterinarian.get().getServices());
        veterinarian1.setPhone(veterinarian.get().getPhone());
        veterinarian1.setDescription(veterinarian.get().getDescription());
        veterinarian1.setAppointments(veterinarian.get().getAppointments());
        veterinarian1.setGoogle_meet(veterinarian.get().getGoogle_meet());
        veterinarian1.setVetSchedules(veterinarian.get().getVetSchedules());
        veterinarian1.setUser(veterinarian.get().getUser());
        veterinarian1.setStatus(veterinarian.get().isStatus());
        return veterinarian1 ;
    }

}
