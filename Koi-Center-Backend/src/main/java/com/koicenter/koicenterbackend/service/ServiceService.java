package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.enums.ServiceType;
import com.koicenter.koicenterbackend.model.request.service.ServiceRequest;
import com.koicenter.koicenterbackend.model.response.service.ServiceResponse;
import com.koicenter.koicenterbackend.repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ServiceService {
    @Autowired
    ServicesRepository servicesRepository;

    public List<ServiceResponse> getAllService(){
        List<com.koicenter.koicenterbackend.model.entity.Service> services = servicesRepository.findAll();
        List<ServiceResponse> responseList = new ArrayList<>();
        for (com.koicenter.koicenterbackend.model.entity.Service service : services) {
            ServiceResponse response = new ServiceResponse();
            response.setServiceId(service.getServiceId());
            response.setServiceName(service.getServiceName());
            response.setDescription(service.getDescription());
            response.setBasePrice(service.getBasePrice());
            response.setPondPrice(service.getPondPrice());
            response.setKoiPrice(service.getKoiPrice());
            response.setServiceFor(service.getServiceFor());
            response.setImage(service.getImage());
            responseList.add(response);
        }
          return responseList;
    }

//    public List<com.koicenter.koicenterbackend.model.entity.Service> getAllServiceByType(){
//        return servicesRepository.findByServiceFor(ServiceType.ONLINE);
//    }

    public ServiceResponse getServiceById(String id){
        com.koicenter.koicenterbackend.model.entity.Service service = servicesRepository.findById(id).orElseThrow(() ->
                new AppException(ErrorCode.SERVICE_NOT_EXITS.getCode(),
                        ErrorCode.SERVICE_NOT_EXITS.getMessage(),HttpStatus.NOT_FOUND));
        ServiceResponse response = new ServiceResponse();
        response.setServiceId(service.getServiceId());
        response.setServiceName(service.getServiceName());
        response.setDescription(service.getDescription());
        response.setBasePrice(service.getBasePrice());
        response.setPondPrice(service.getPondPrice());
        response.setKoiPrice(service.getKoiPrice());
        response.setServiceFor(service.getServiceFor());
        response.setImage(service.getImage());
        return response;
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

    public boolean createService(ServiceRequest serviceRequest) {
        try {
            if(servicesRepository.findByserviceName(serviceRequest.getServiceName()).isPresent()) {
                return false;
            }
            com.koicenter.koicenterbackend.model.entity.Service service = com.koicenter.koicenterbackend.model.entity.Service.builder()
                    .serviceName(serviceRequest.getServiceName())
                    .description(serviceRequest.getDescription())
                    .basePrice(serviceRequest.getBasePrice())
                    .pondPrice(serviceRequest.getPondPrice())
                    .koiPrice(serviceRequest.getKoiPrice())
                    .serviceFor(serviceRequest.getServiceFor())
                    .image(serviceRequest.getImage())
                    .status(true)
                    .build();
            servicesRepository.save(service);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    public boolean updateService(ServiceRequest serviceRequest) {
        try{
            com.koicenter.koicenterbackend.model.entity.Service existingService = servicesRepository.findByserviceName(serviceRequest.getServiceName())
                    .orElse(null);
            if (existingService == null) {
                return false;
            }
            existingService.setServiceName(serviceRequest.getServiceName());
            existingService.setDescription(serviceRequest.getDescription());
            existingService.setBasePrice(serviceRequest.getBasePrice());
            existingService.setPondPrice(serviceRequest.getPondPrice());
            existingService.setKoiPrice(serviceRequest.getKoiPrice());
            existingService.setServiceFor(serviceRequest.getServiceFor());
            existingService.setImage(serviceRequest.getImage());
            servicesRepository.save(existingService);
            return true;
        }catch (Exception e) {
            return false;
        }
    }
    public boolean deleteService(String serviceId) {
        Optional<com.koicenter.koicenterbackend.model.entity.Service> optionalService = Optional.ofNullable(servicesRepository.findByServiceId(serviceId));
        if (!optionalService.isPresent()) {
            return false;
        }

        // Get the existing service object
        com.koicenter.koicenterbackend.model.entity.Service existingService = optionalService.get();

        // Set status to false (soft delete)
        existingService.setStatus(false);

        // Save the updated service back to the repository
        servicesRepository.save(existingService);

        return true;  // Return true if the status update was successful
    }


}
