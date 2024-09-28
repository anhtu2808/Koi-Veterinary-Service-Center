package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.entity.Koi;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.repository.KoiRepository;
import com.koicenter.koicenterbackend.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private PondRepository pondRepository;

    @Autowired
    private KoiRepository koiRepository;

    public List<Pond> getPondsByCustomerId(String customerId) {
        return pondRepository.getPondsByCustomerId(customerId);
    }

    public List<Koi> getKoiByCustomerId(String customerId) {
        return koiRepository.getKoiByCustomerId(customerId);
    }

}
