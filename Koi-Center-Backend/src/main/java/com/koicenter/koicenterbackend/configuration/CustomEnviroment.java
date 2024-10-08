package com.koicenter.koicenterbackend.configuration;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

@Configuration
@Data
@NoArgsConstructor

public class CustomEnviroment {
    private PartnerInfo partnerInfo;
    private MomoEndpoint endpoints;
    private String target;

    public CustomEnviroment(MomoEndpoint endpoints, PartnerInfo partnerInfo, EnvTarget target){
        this(endpoints, partnerInfo, target.string());
    }

    public CustomEnviroment(MomoEndpoint endpoints, PartnerInfo partnerInfo, String target){
        this.endpoints = endpoints;
        this.partnerInfo = partnerInfo;
        this.target = target;
    }

    public static CustomEnviroment selectEnv(String target) throws IllegalArgumentException{
        return selectEnv(EnvTarget.DEV);
    }

    public static CustomEnviroment selectEnv(EnvTarget target){
        switch(target){
            case DEV:
                MomoEndpoint devEnpoint = new MomoEndpoint("https://test-payment.momo.vn/v2/gateway/api","/create");
                PartnerInfo devInfo = new PartnerInfo("MOMOLRJZ20181206", "mTCKt9W3eU1m39TW", "SetA5RDnLHvt51AULf51DyauxUo3kDU6");
                CustomEnviroment devEn = new CustomEnviroment(devEnpoint, devInfo, target);
                return devEn;

                default:
                    throw new IllegalArgumentException("Momo does not provide other enviroment: dev n prod");
        }
    }

    public MomoEndpoint getMomoEndpoint(){
        return endpoints;
    }

    public enum EnvTarget{
        DEV("development"), PROD("production");
        private String target;
        EnvTarget(String target){
            this.target = target;
        }
        public String string(){
            return this.target;
        }
    }

    public enum ProcessType{
        PAY_GATE, APP_IN_APP, PAY_POS, PAY_QUERY_REFUND, PAY_CONFIRM;

        public String getSubDir(Properties prop){
            return prop.getProperty(this.toString());
        }
    }
}

