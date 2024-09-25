package com.koicenter.koicenterbackend.service;


import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.LoggedOutToken;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.enums.Role;
import com.koicenter.koicenterbackend.model.request.LoginRequest;
import com.koicenter.koicenterbackend.repository.LoggedOutTokenRepository;
import com.koicenter.koicenterbackend.repository.UserRepository;
import com.koicenter.koicenterbackend.util.JWTUtilHelper;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class AuthenticateService {

    private static final Logger log = LoggerFactory.getLogger(AuthenticateService.class);
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    LoggedOutTokenRepository loggedOutTokenRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
     JWTUtilHelper jWTUtilHelper;


    public boolean checkLogin(@Valid LoginRequest loginRequest) {

        User user = userRepository.findByUsername(loginRequest.getUsername());
        if(user == null) {
            throw new AppException(ErrorCode.INVALID_LOGIN.getCode(),ErrorCode.INVALID_LOGIN.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        boolean authenticated = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

        if (!authenticated) {
            throw new AppException(ErrorCode.INVALID_LOGIN.getCode(),ErrorCode.INVALID_LOGIN.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        return true;
    }
    public boolean logout(String token) {
      if(loggedOutTokenRepository.findByToken(token).isEmpty() && jWTUtilHelper.verifyToken(token)) {
          LoggedOutToken loggedOutToken = new LoggedOutToken(token, new Date());
          loggedOutTokenRepository.save(loggedOutToken);
          return true;
      }else {
          throw new AppException(ErrorCode.INVALID_LOGOUT.getCode(), "Invalid token", HttpStatus.UNAUTHORIZED);
      }
    }


    public String loginGoogleToken(Map<String, Object> credential) {
        User user = new User();
        user.setUsername(credential.get("email").toString());
        user.setFull_name(credential.get("given_name").toString());
        user.setImage(credential.get("picture").toString());
        user.setEmail(credential.get("email").toString());
        user.setStatus(true);
        user.setRole(Role.CUSTOMER);
       return jWTUtilHelper.generateTokenGmail( userRepository.save(user));
    }
}
