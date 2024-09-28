package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.request.KoiUpdateRequest;
import com.koicenter.koicenterbackend.repository.KoiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
}
