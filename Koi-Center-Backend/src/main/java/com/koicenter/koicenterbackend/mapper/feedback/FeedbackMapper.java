package com.koicenter.koicenterbackend.mapper.feedback;

import com.koicenter.koicenterbackend.model.entity.Feedback;
import com.koicenter.koicenterbackend.model.entity.Pond;
import com.koicenter.koicenterbackend.model.request.feedback.FeedbackRequest;
import com.koicenter.koicenterbackend.model.response.feedback.FeedbackResponse;
import com.koicenter.koicenterbackend.model.response.pond.PondResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {
    @Mapping(target = "appointment",ignore = true)
    @Mapping(target = "feedbackId" , ignore = true)
    Feedback toFeedback(FeedbackRequest feedbackRequest);
    @Mapping(source = "feedback.appointment.appointmentId",target = "appointmentId")
    FeedbackResponse toFeedbackResponse(Feedback feedback);
}
