package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.response.koi.KoiResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondResponse;
import com.koicenter.koicenterbackend.repository.CustomerRepository;
import com.koicenter.koicenterbackend.repository.KoiRepository;
import com.koicenter.koicenterbackend.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private PondRepository pondRepository;

    @Autowired
    private KoiRepository koiRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<PondResponse> getPondsByCustomerId(String customerId) {

        boolean exists = customerRepository.existsById(customerId);
        if (!exists) {
            throw new AppException(ErrorCode.CUSTOMER_NOT_EXITS.getCode(),
                    ErrorCode.CUSTOMER_NOT_EXITS.getMessage(),
                    HttpStatus.NOT_FOUND);
        }

        List<Pond> ponds = pondRepository.findByCustomer_CustomerIdAndStatusTrue(customerId);
        if (ponds.isEmpty()) {
            throw new AppException(ErrorCode.POND_NOT_EXITS.getCode(),
                    ErrorCode.POND_NOT_EXITS.getMessage(),
                    HttpStatus.NOT_FOUND);
        }
        List<PondResponse> pondResponses = new ArrayList<>();
        for (Pond pond : ponds) {
            PondResponse pondResponse = new PondResponse();
            pondResponse.setPondId(pond.getPondId());
            pondResponse.setStatus(pond.isStatus());
            pondResponse.setDepth(pond.getDepth());
            pondResponse.setPerimeter(pond.getPerimeter());
            pondResponse.setTemperature(pond.getTemperature());
            pondResponse.setNotes(pond.getNotes());
            pondResponse.setImage(pond.getImage());
            pondResponse.setWaterQuality(pond.getWaterQuality());
            pondResponse.setFilterSystem(pond.getFilterSystem());
            pondResponses.add(pondResponse);
        }
        return pondResponses;
    }

    public List<KoiResponse> getKoiByCustomerId(String customerId) {

        boolean exists = customerRepository.existsById(customerId);
        if (!exists) {
            throw new AppException(ErrorCode.CUSTOMER_NOT_EXITS.getCode(),
                    ErrorCode.CUSTOMER_NOT_EXITS.getMessage(),
                    HttpStatus.NOT_FOUND);
        }

        List<Koi> kois = koiRepository.findByCustomer_CustomerIdAndStatusTrue(customerId);
        if (kois.isEmpty()) {
            throw new AppException(ErrorCode.POND_NOT_EXITS.getCode(),
                    ErrorCode.POND_NOT_EXITS.getMessage(),
                    HttpStatus.NOT_FOUND);
        }

        List<KoiResponse> koiResponses = new ArrayList<>();
        for (Koi koi : kois) {
            KoiResponse koiResponse = new KoiResponse();
            koiResponse.setKoiId(koi.getKoiId());
            koiResponse.setBreed(koi.getBreed());
            koiResponse.setAge(koi.getAge());
            koiResponse.setLength(koi.getLength());
            koiResponse.setWeight(koi.getWeight());
            koiResponse.setStatus(koi.isStatus());
            koiResponse.setNotes(koi.getNotes());
            koiResponse.setImage(koi.getImage());
            koiResponses.add(koiResponse);
        }
        return koiResponses;
    }

}
