package com.koicenter.koicenterbackend.model.request.news;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class NewsRequest {
    String title;
    String preview;
    String content;
    String img;
}
