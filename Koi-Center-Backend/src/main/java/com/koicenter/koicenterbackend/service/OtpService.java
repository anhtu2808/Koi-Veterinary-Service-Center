package com.koicenter.koicenterbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    @Autowired
    SendEmalService sendEmalService;

    private final ConcurrentHashMap<String, OtpData> otpStorage = new ConcurrentHashMap<>();

    private static class OtpData {
        String otp;
        long expiryTime;

        OtpData(String otp, long expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }
    }

    public void generateOtp(String email) {
        String otp = generateRandomOtp();
        long expiryTime = System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(10);
        otpStorage.put(email, new OtpData(otp, expiryTime));

        String subject = "OTP TO RESET PASSWORD";
        String body = "This is a one-time use code that will expire in 10 minutes, please enter it to change your password.\n" +
                "Verification code: " + otp + "\n"+
                "If you did not request this, please ignore this email.\n" +
                "Best regards,\n" +
                "KOIMED";
        sendEmalService.sendMailSender(email, body, subject);
    }

    public boolean verifyOtp(String email, String otp) {
        OtpData otpData = otpStorage.get(email);
        if (otpData != null && otpData.otp.equals(otp) && System.currentTimeMillis() < otpData.expiryTime) {
            otpStorage.remove(email);
            return true;
        }
        return false;
    }

    private String generateRandomOtp() {
        return String.valueOf((int) (Math.random() * 1000000));
    }
}
