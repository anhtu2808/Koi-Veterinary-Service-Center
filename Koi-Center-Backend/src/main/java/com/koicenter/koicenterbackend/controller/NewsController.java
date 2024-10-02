package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.entity.News;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/news")
public class NewsController {
    @Autowired
    NewsService newsService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllNews() {
        List<News> newsList = newsService.getAllNews();
        if(newsList.isEmpty()){
            return ResponseObject.APIRepsonse(404, "No content", HttpStatus.NOT_FOUND,null);
        }
        return ResponseObject.APIRepsonse(200, "Fetched all news successfully", HttpStatus.OK, newsList);
    }
    @GetMapping("/id")
    public ResponseEntity<ResponseObject> getNewsById(@RequestParam String id) {
        News news = newsService.getNewsById(id);
        if (news != null) {
            return ResponseObject.APIRepsonse(200, "Fetched news successfully", HttpStatus.OK, news);
        } else {
            return ResponseObject.APIRepsonse(404, "News not found", HttpStatus.NOT_FOUND, null);
        }
    }
}
