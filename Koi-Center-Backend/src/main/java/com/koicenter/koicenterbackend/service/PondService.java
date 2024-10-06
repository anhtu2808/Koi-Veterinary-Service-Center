package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.mapper.PondMapper;
import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.request.pond.PondRequest;
import com.koicenter.koicenterbackend.model.request.pond.PondUpdateRequest;
import com.koicenter.koicenterbackend.model.response.pond.PondResponse;
import com.koicenter.koicenterbackend.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PondService {

    @Autowired
    PondRepository pondRepository;

    PondMapper pondMapper;
    //check hồ

    public List<Pond> getAllPonds() {

        return pondRepository.findAll();
    }


    //    api get thong tin detail của hồ / cá

    public PondResponse getPondById(String id) {
        Pond pond = pondRepository.findById(id).orElseThrow(()
                -> new AppException(ErrorCode.POND_NOT_EXITS.getCode(),
                ErrorCode.POND_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));
        PondResponse pondResponse = new PondResponse();
        pondResponse.setPondId(pond.getPondId());
        pondResponse.setStatus(pond.getStatus());
        pondResponse.setDepth(pond.getDepth());
        pondResponse.setPerimeter(pond.getPerimeter());
        pondResponse.setTemperature(pond.getTemperature());
        pondResponse.setNotes(pond.getNotes());
        pondResponse.setImage(pond.getImage());
        pondResponse.setWaterQuality(pond.getWaterQuality());
        pondResponse.setFilterSystem(pond.getFilterSystem());
        return pondResponse;
    }


    //api update hồ
    public PondResponse updatePond(String pondId, PondUpdateRequest request) {
        Pond pond = pondRepository.findById(pondId).orElseThrow(()
                -> new AppException(ErrorCode.POND_NOT_EXITS.getCode(),
                ErrorCode.POND_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));
        pond.setStatus(request.getStatus());
        pond.setDepth(request.getDepth());
        pond.setPerimeter(request.getPerimeter());
        pond.setTemperature(request.getTemperature());
        pond.setNotes(request.getNotes());
        pond.setImage(request.getImage());
        pond.setFilterSystem(request.getFilterSystem());
        pond.setWaterQuality(request.getWaterQuality());
        return pondMapper.toPondResponse( pondRepository.save(pond)) ;
    }



    public PondResponse createPond (PondRequest pondRequest){
        Pond pond = new Pond();
        pond.setStatus(pondRequest.getStatus());
        pond.setDepth(pondRequest.getDepth());
        pond.setPerimeter(pondRequest.getPerimeter());
        pond.setTemperature(pondRequest.getTemperature());
        pond.setNotes(pondRequest.getNotes());
        pond.setImage(pondRequest.getImage());
        pond.setFilterSystem(pondRequest.getFilterSystem());
        pond.setWaterQuality(pondRequest.getWaterQuality());
        Customer customer = new Customer();
        customer.setCustomerId(pondRequest.getCustomerId());
        pond.setCustomer(customer);
        return pondMapper.toPondResponse( pondRepository.save(pond)) ;
    }
}
