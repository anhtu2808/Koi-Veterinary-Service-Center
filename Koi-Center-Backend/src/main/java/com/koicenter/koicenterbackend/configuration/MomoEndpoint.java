package com.koicenter.koicenterbackend.configuration;

public class MomoEndpoint {
    private String endpoint;
    private String create;

    public MomoEndpoint(String endpoint, String create) {
        this.endpoint = endpoint;
        this.create = create;
    }

    public String getCreateUrl() {
        return endpoint + create;
    }
}
