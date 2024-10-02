package com.koicenter.koicenterbackend.service;

import aj.org.objectweb.asm.commons.Remapper;
import com.koicenter.koicenterbackend.model.entity.News;
import com.koicenter.koicenterbackend.model.request.news.NewsRequest;
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

    public boolean updateNews(String newId, NewsRequest newsDetails) {
        try {
        News optionalNews = newsRepository.findBynewId(newId);
            if (optionalNews != null) {
               optionalNews.setTitle(newsDetails.getTitle());
               optionalNews.setContent(newsDetails.getContent());
               optionalNews.setPreview(newsDetails.getPreview());
               optionalNews.setImg(newsDetails.getImg());
                newsRepository.save(optionalNews);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
