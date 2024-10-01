package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Medicine;
import com.koicenter.koicenterbackend.model.request.prescription.MedicineRequest;
import com.koicenter.koicenterbackend.model.response.medicine.MedicineResponse;
import com.koicenter.koicenterbackend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    //hien thi all thuoc
    public List<MedicineResponse> getAllMedicines() {
        List<Medicine> medicines = medicineRepository.findAll();
        List<MedicineResponse> medicinesResponse = new ArrayList<>();
        for (Medicine medicine : medicines){
            MedicineResponse response = new MedicineResponse();
            response.setMedicineId(medicine.getMedicineId());
            response.setName(medicine.getName());
            response.setDescription(medicine.getDescription());
            medicinesResponse.add(response);
        }
        return medicinesResponse;
    }

    //hien thi 1 thuoc
    public MedicineResponse getMedicineById(String id) {
        Medicine medicine = medicineRepository.findById(id).orElseThrow(() ->
                new AppException(ErrorCode.MEDICINE_NOT_EXITS.getCode(),
                ErrorCode.MEDICINE_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));

        MedicineResponse response = new MedicineResponse();
        response.setMedicineId(medicine.getMedicineId());
        response.setName(medicine.getName());
        response.setDescription(medicine.getDescription());

        return response;
    }

    //c thuoc
    public MedicineResponse createMedicine(MedicineRequest medicineRequest) {
        Medicine medicine = new Medicine();
        medicine.setName(medicineRequest.getName());
        medicine.setDescription(medicineRequest.getDescription());
        medicine = medicineRepository.save(medicine);
        return new MedicineResponse(medicine.getMedicineId(), medicine.getName(), medicine.getDescription());
    }

    //u thuoc
    public MedicineResponse updateMedicine(String id, MedicineRequest medicineRequest) {
        Medicine medicine = medicineRepository.findById(id).orElseThrow(() ->
                new AppException(ErrorCode.MEDICINE_NOT_EXITS.getCode(),
                        ErrorCode.MEDICINE_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));

        medicine.setName(medicineRequest.getName());
        medicine.setDescription(medicineRequest.getDescription());
        medicine = medicineRepository.save(medicine);
        return new MedicineResponse(medicine.getMedicineId(), medicine.getName(), medicine.getDescription());
    }

    //d thuoc
    public void deleteMedicine(String id) {
        Medicine medicine = medicineRepository.findById(id).orElseThrow(() ->
                new AppException(ErrorCode.MEDICINE_NOT_EXITS.getCode(),
                        ErrorCode.MEDICINE_NOT_EXITS.getMessage(), HttpStatus.NOT_FOUND));
        medicineRepository.delete(medicine);
    }

}
