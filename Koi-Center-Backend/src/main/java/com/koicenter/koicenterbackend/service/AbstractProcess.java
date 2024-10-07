package com.koicenter.koicenterbackend.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.koicenter.koicenterbackend.configuration.CustomEnviroment;
import com.koicenter.koicenterbackend.configuration.PartnerInfo;
import com.koicenter.koicenterbackend.util.Execute;
import com.mservice.shared.exception.MoMoException;

public abstract class AbstractProcess<T, V> {

    protected PartnerInfo partnerInfo;
    protected CustomEnviroment environment;
    protected Execute execute = new Execute();

    public AbstractProcess(CustomEnviroment environment) {
        this.environment = environment;
        this.partnerInfo = environment.getPartnerInfo();
    }

    public static Gson getGson() {
        return new GsonBuilder()
                .disableHtmlEscaping()
                .create();
    }

    public abstract V execute(T request) throws MoMoException;
}
