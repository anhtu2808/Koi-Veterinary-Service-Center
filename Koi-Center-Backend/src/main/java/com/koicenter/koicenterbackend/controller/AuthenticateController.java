package com.koicenter.koicenterbackend.controller;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.koicenter.koicenterbackend.model.request.authentication.LoginRequest;
import com.koicenter.koicenterbackend.model.request.authentication.LogoutRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.AuthenticateService;
import com.koicenter.koicenterbackend.util.JWTUtilHelper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;
@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticateController {


    @Autowired
    JWTUtilHelper jwtUtilHelper;


    @Autowired
    AuthenticateService authenticateService;
    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody @Valid LoginRequest loginRequest) {
        boolean checkLogin = authenticateService.checkLogin(loginRequest);
        if (checkLogin) {
            String token = jwtUtilHelper.generateToken(loginRequest.getUsername());
            return ResponseObject.APIRepsonse(200, "Login Successfully", HttpStatus.OK, token);
        }else{
            return ResponseObject.APIRepsonse(401, "Invalid username or password", HttpStatus.UNAUTHORIZED, "");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseObject> logout(@RequestBody @Valid LogoutRequest logoutRequest) {
      boolean check =  authenticateService.logout(logoutRequest.getToken());
      if(check){
          return ResponseObject.APIRepsonse(200, "Logout Successfully", HttpStatus.OK, "");
      }else {
          return ResponseObject.APIRepsonse(401, "Logout Failed", HttpStatus.UNAUTHORIZED, "");
      }
    }


    @PostMapping("/login-success")
    public ResponseEntity<ResponseObject> logicGoogleSuccess(@RequestBody Map<String, String> request) {
        String googleToken = request.get("token");
        // Xác thực token từ Google
        GoogleIdToken idToken = authenticateService.verifyGoogleToken(googleToken);
        GoogleIdToken.Payload payload = idToken.getPayload();
        String token = authenticateService.loginGoogleReturnToken(payload);
        log.info(payload.toString());
        return ResponseObject.APIRepsonse(200, "Login Successfully", HttpStatus.OK, token);
    }

}

