package com.koicenter.koicenterbackend.model.request.Faq;

import jakarta.persistence.Lob;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FaqRequest {
    @Lob
    String question;
    @Lob
    String answer;
    LocalDate createdAt;
}
