package com.koicenter.koicenterbackend.model.request.feedback;

import com.koicenter.koicenterbackend.model.entity.Appointment;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class FeedbackRequest {
    String feedbackId;
    int star;
    String description;
    String  appointmentId;
}
