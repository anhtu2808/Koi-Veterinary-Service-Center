package com.koicenter.koicenterbackend.model.entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class LoggedOutToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String token;

    private Date loggedOutAt;

    // Constructors, getters, and setters
    public LoggedOutToken() {}

    public LoggedOutToken(String token, Date loggedOutAt) {
        this.token = token;
        this.loggedOutAt = loggedOutAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getLoggedOutAt() {
        return loggedOutAt;
    }

    public void setLoggedOutAt(Date loggedOutAt) {
        this.loggedOutAt = loggedOutAt;
    }
}
