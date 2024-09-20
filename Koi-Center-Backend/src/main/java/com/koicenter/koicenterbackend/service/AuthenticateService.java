package com.koicenter.koicenterbackend.service;


import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.request.LoginRequest;
import com.koicenter.koicenterbackend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticateService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;
    public boolean checkLogin(@Valid LoginRequest loginRequest) {

        User user = userRepository.findByUsername(loginRequest.getUsername());
        if(user == null) {
            throw new AppException(ErrorCode.INVALID_LOGIN.getCode(),ErrorCode.INVALID_LOGIN.getMessage());
        }

        boolean authenticated = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

        if (!authenticated) {
            throw new AppException(ErrorCode.INVALID_LOGIN.getCode(),ErrorCode.INVALID_LOGIN.getMessage());
        }
        return true;
    }


}
