//package com.koicenter.koicenterbackend.repository;
//
//import com.koicenter.koicenterbackend.model.entity.Veterinarian;
//import com.koicenter.koicenterbackend.model.response.VetServiceResponse;
//import com.koicenter.koicenterbackend.service.VeterinarianService;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//public interface VeterinarianServiceRepository extends JpaRepository<VeterinarianService, String> {
//
////    @Query("SELECT vs.vet_id FROM Service s join Veterinarian v on s.serviceId = v.vetId WHERE vs.service_id = 'SER001'")
////    String findVetIdsByServiceId(@Param("serviceId") String serviceId);
//
//}
