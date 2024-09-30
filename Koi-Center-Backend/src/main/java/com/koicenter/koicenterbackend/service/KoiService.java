package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.request.koi.KoiRequest;
import com.koicenter.koicenterbackend.model.request.koi.KoiUpdateRequest;
import com.koicenter.koicenterbackend.repository.KoiRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KoiService {

    @Autowired
     KoiRepository koiRepository;

    public List<Koi> getAllKoi(){
        return koiRepository.findAll();
    }

    public Koi getKoiById(String koiId){
        return koiRepository.findById(koiId).orElseThrow(()
                -> new AppException(ErrorCode.KOI_NOT_EXITS.getCode(),
                ErrorCode.KOI_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));
    }

    public Koi updateKoi(String koiId, KoiUpdateRequest request){
        Koi koi = koiRepository.findById(koiId).orElseThrow(()
                -> new AppException(ErrorCode.KOI_NOT_EXITS.getCode(),
                ErrorCode.KOI_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));

        koi.setBreed(request.getBreed());
        koi.setAge(request.getAge());
        koi.setHeight(request.getHeight());
        koi.setWeight(request.getWeight());
        koi.setHealthStatus(request.getHealthStatus());
        koi.setNotes(request.getNotes());
        koi.setImage(request.getImage());
        return koiRepository.save(koi);

    }
        public void createKoi (KoiRequest koiRequest){
            Koi koi = new Koi();
            koi.setBreed(koiRequest.getBreed());
            koi.setAge(koiRequest.getAge());
            koi.setHeight(koiRequest.getHeight());
            koi.setWeight(koiRequest.getWeight());
            koi.setHealthStatus(koiRequest.getHealthStatus());
            koi.setNotes(koiRequest.getNotes());
            koi.setImage(koiRequest.getImage());
            Customer customer = new Customer();
            customer.setCustomerId(koiRequest.getCustomer_id());
            koi.setCustomer(customer);
            koiRepository.save(koi);
        }
}
