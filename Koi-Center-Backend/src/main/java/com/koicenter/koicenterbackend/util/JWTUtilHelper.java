package com.koicenter.koicenterbackend.util;


import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Component
public class JWTUtilHelper {
    @Autowired
    UserRepository userRepository;

    @Value("${myapp.api-key}")
    private String privateKey;


    public String generateToken(String data){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
        User user = userRepository.findByUsername(data);

        String jws = Jwts.builder().subject(data)
                .claim("user_id", user.getUser_id())
                .issuer("KoiCenter.com")
                .issuedAt(new Date())
                .claim("jti", UUID.randomUUID().toString())
                .expiration(new Date(
                        Instant.now().plus(3, ChronoUnit.DAYS).toEpochMilli()
                ))
                .signWith(key).compact();
        return jws;
    }

}