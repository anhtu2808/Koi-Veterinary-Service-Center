package com.koicenter.koicenterbackend.service;


import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.LoggedOutToken;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.enums.Role;
import com.koicenter.koicenterbackend.model.request.authentication.LoginRequest;
import com.koicenter.koicenterbackend.repository.CustomerRepository;
import com.koicenter.koicenterbackend.repository.LoggedOutTokenRepository;
import com.koicenter.koicenterbackend.repository.UserRepository;
import com.koicenter.koicenterbackend.util.JWTUtilHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthenticateService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    LoggedOutTokenRepository loggedOutTokenRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    JWTUtilHelper jWTUtilHelper;
    @Autowired
    CustomerRepository customerRepository;


    public boolean checkLogin(LoginRequest loginRequest) {

        User user = userRepository.findByUsername(loginRequest.getUsername());
        if (user == null || !user.isStatus()) {
            throw new AppException(ErrorCode.INVALID_LOGIN.getCode(), ErrorCode.INVALID_LOGIN.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        boolean authenticated = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

        if (!authenticated) {
            throw new AppException(ErrorCode.INVALID_LOGIN.getCode(), ErrorCode.INVALID_LOGIN.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        return true;
    }

    public boolean logout(String token) {
        if (loggedOutTokenRepository.findByToken(token) == null) {
            LoggedOutToken loggedOutToken = new LoggedOutToken(token, new Date());
            loggedOutTokenRepository.save(loggedOutToken);
            return true;
        } else {
            throw new AppException(ErrorCode.INVALID_LOGOUT.getCode(), "Sign Out Failed", HttpStatus.FORBIDDEN);
        }
    }

    public String loginGoogleToken(Map<String, Object> credential) {

        String email = (String) credential.getOrDefault("email", "");
        String fullName = (String) credential.getOrDefault("given_name", "");
        String image = (String) credential.getOrDefault("picture", "");
        String name = (String) credential.getOrDefault("name", "");
        if (email.isEmpty()) {
            throw new AppException(ErrorCode.INVALID_LOGIN.getCode(), "Email is required for login.", HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findByEmail(email);

        if (user != null) {
            return jWTUtilHelper.generateTokenGmail(user);
        }

        user = new User();
        user.setUsername(name);
        user.setFullName(fullName);
        user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
        user.setImage(image);
        user.setEmail(email);
        user.setStatus(true);
        user.setRole(Role.CUSTOMER);
        userRepository.save(user);
        if (user.getRole() == Role.CUSTOMER) {
            Customer customer = new Customer();
            customer.setUser(user);
            customerRepository.save(customer);
        }
        return jWTUtilHelper.generateTokenGmail(user);
    }
}
