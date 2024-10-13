package com.koicenter.koicenterbackend.repository;

import com.koicenter.koicenterbackend.model.entity.Feedback;
import com.koicenter.koicenterbackend.model.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, String> {
    Feedback findByAppointment_AppointmentId(String appointmentId);
}
