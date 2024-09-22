package com.koicenter.koicenterbackend.controller;


import com.koicenter.koicenterbackend.model.request.LoginRequest;
import com.koicenter.koicenterbackend.model.request.LogoutRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.AuthenticateService;
import com.koicenter.koicenterbackend.util.JWTUtilHelper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            return ResponseObject.APIRepsonse("200", "Login Successfully", HttpStatus.OK, token);
        }
        return ResponseObject.APIRepsonse("401", "Invalid username or password", HttpStatus.UNAUTHORIZED, "");
    }
    @PostMapping("/logout")
    public ResponseEntity<ResponseObject> logout(@RequestBody @Valid LogoutRequest logoutRequest) {
      boolean check =  authenticateService.logout(logoutRequest.getToken());
      if(check){
          return ResponseObject.APIRepsonse("200", "Logout Successfully", HttpStatus.OK, "");
      }else {
          return ResponseObject.APIRepsonse("401", "Logout Failed", HttpStatus.UNAUTHORIZED, "");
      }
    }
}

