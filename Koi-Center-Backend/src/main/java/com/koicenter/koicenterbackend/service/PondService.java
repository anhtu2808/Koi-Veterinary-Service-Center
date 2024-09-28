package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.request.PondUpdateRequest;
import com.koicenter.koicenterbackend.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PondService {

    @Autowired
    PondRepository pondRepository;

    //check hồ

    public List<Pond> getAllPonds() {
        return pondRepository.findAll();
    }


    //    api get thong tin detail của hồ / cá

    public Pond getPondById(String id) {
        return pondRepository.findById(id).orElseThrow(()
                -> new AppException(ErrorCode.POND_NOT_EXITS.getCode(),
                ErrorCode.POND_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));
    }


    //api update hồ
    public Pond updatePond(String pondId, PondUpdateRequest request) {
        Pond pond = pondRepository.findById(pondId).orElseThrow(()
                -> new AppException(ErrorCode.POND_NOT_EXITS.getCode(),
                ErrorCode.POND_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));
        pond.setStatus(request.getStatus());
        pond.setDepth(request.getDepth());
        pond.setPerimeter(request.getPerimeter());
        pond.setTemperature(request.getTemperature());
        pond.setNotes(request.getNotes());
        pond.setImage(request.getImage());
        return pondRepository.save(pond);
    }
}
