package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.enums.ServiceType;
import com.koicenter.koicenterbackend.repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService {
    @Autowired
    ServicesRepository servicesRepository;

    public List<com.koicenter.koicenterbackend.model.entity.Service> getAllService(){
          return servicesRepository.findAll();
    }

    public List<com.koicenter.koicenterbackend.model.entity.Service> getAllServiceByType(){
        List<com.koicenter.koicenterbackend.model.entity.Service> services = new ArrayList<>();
        List<com.koicenter.koicenterbackend.model.entity.Service> serviceForFish = servicesRepository.findByServiceFor(ServiceType.FISH);
        List<com.koicenter.koicenterbackend.model.entity.Service> servicesForPond = servicesRepository.findByServiceFor(ServiceType.POND);
        List<com.koicenter.koicenterbackend.model.entity.Service> servicesForOnline = servicesRepository.findByServiceFor(ServiceType.ONLINE);
        for (com.koicenter.koicenterbackend.model.entity.Service service : serviceForFish) {
            services.add(service);
        }
        for (com.koicenter.koicenterbackend.model.entity.Service service : servicesForPond){
            services.add(service);
        }
        for (com.koicenter.koicenterbackend.model.entity.Service service : servicesForOnline){
            services.add(service);
        }
        return services;


    }

    public com.koicenter.koicenterbackend.model.entity.Service getServiceById(String id){
        return servicesRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_EXITS.getCode(), ErrorCode.SERVICE_NOT_EXITS.getMessage(),HttpStatus.NOT_FOUND));
    }
    public List<com.koicenter.koicenterbackend.model.entity.Service> getServiceFor(String servicefor){
        List<com.koicenter.koicenterbackend.model.entity.Service> services = new ArrayList<>();
        if (servicefor.toLowerCase().equals("MOBILE".toLowerCase())){
           List<com.koicenter.koicenterbackend.model.entity.Service> serviceForFish = servicesRepository.findByServiceFor(ServiceType.FISH);
           List<com.koicenter.koicenterbackend.model.entity.Service> servicesForPond = servicesRepository.findByServiceFor(ServiceType.POND);

           for (com.koicenter.koicenterbackend.model.entity.Service service : serviceForFish) {
               services.add(service);
           }
            for (com.koicenter.koicenterbackend.model.entity.Service service : servicesForPond){
                services.add(service);
            }
           }
        else if (servicefor.toLowerCase().equals("CENTER".toLowerCase())){
            List<com.koicenter.koicenterbackend.model.entity.Service> serviceForFish = servicesRepository.findByServiceFor(ServiceType.FISH);
            for (com.koicenter.koicenterbackend.model.entity.Service service : serviceForFish) {
                services.add(service);
            }
        }else {
            List<com.koicenter.koicenterbackend.model.entity.Service> serviceForOnline = servicesRepository.findByServiceFor(ServiceType.ONLINE);
            for (com.koicenter.koicenterbackend.model.entity.Service service : serviceForOnline) {
                services.add(service);
            }
        }
        return services;
    }

}
