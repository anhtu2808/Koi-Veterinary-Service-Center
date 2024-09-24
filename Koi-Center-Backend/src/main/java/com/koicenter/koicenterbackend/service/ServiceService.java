package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.enums.ServiceType;
import com.koicenter.koicenterbackend.repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {
    @Autowired
    ServicesRepository servicesRepository;

    public List<com.koicenter.koicenterbackend.model.entity.Service> getAllService(){
          return servicesRepository.findAll();
    }

    public List<com.koicenter.koicenterbackend.model.entity.Service> getAllServiceByType(){
        return servicesRepository.findByServiceForNot(ServiceType.ONLINE);
    }

    public com.koicenter.koicenterbackend.model.entity.Service getServiceById(String id){
        return servicesRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_EXITS.getCode(),ErrorCode.SERVICE_NOT_EXITS.getMessage()));
    }
}
