package com.koicenter.koicenterbackend.model.response.feedback;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FeedbackResponse {
    String feedbackId;
    int star;
    String description;
    String  appointmentId;
    float averageStar ;
    int number ;
}
