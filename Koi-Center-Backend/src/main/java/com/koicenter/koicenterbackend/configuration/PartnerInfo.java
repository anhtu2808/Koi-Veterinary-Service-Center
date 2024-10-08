package com.koicenter.koicenterbackend.configuration;

import lombok.Data;

@Data
public class PartnerInfo {
    private String accessKey;
    private String partnerCode;
    private String secretKey;
    private String publicKey;

    public PartnerInfo(String partnerCode, String accessKey, String secretKey) {
        this.partnerCode = partnerCode;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    public PartnerInfo(String partnerCode, String accessKey, String secretKey, String publicKey) {
        this.partnerCode = partnerCode;
        this.secretKey = secretKey;
        this.publicKey = publicKey;
        this.accessKey = accessKey;
    }
}
