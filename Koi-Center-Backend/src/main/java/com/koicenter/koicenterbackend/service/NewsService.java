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

    public boolean createNews(News news) {
        try {
            News news1 = News.builder()
                    .img(news.getImg())
                    .title(news.getTitle())
                    .content(news.getContent())
                    .preview(news.getPreview())
                    .build();
            newsRepository.save(news1);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
