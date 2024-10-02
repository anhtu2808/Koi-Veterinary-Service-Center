package com.koicenter.koicenterbackend.service;

import aj.org.objectweb.asm.commons.Remapper;
import com.koicenter.koicenterbackend.model.entity.News;
import com.koicenter.koicenterbackend.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    @Autowired
    NewsRepository newsRepository;
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }


    public News getNewsById(String id) {
        return newsRepository.findBynewId(id);
    }
}
