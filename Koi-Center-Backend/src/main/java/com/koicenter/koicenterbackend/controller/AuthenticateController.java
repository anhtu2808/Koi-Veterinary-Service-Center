package com.koicenter.koicenterbackend.controller;


import com.koicenter.koicenterbackend.model.request.authentication.LoginRequest;
import com.koicenter.koicenterbackend.model.request.authentication.LogoutRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.AuthenticateService;
import com.koicenter.koicenterbackend.util.JWTUtilHelper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

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

    // http://localhost:8080/oauth2/authorization/google
    @GetMapping("/loginGoogle")
    public ResponseEntity<ResponseObject> loginWithGoogle(OAuth2AuthenticationToken oAuth2AuthenticationToken, HttpServletResponse response) {
        Map<String, Object> credential = oAuth2AuthenticationToken.getPrincipal().getAttributes();
        String token = authenticateService.loginGoogleToken(credential);

        // Đặt token vào cookie
        Cookie tokenCookie = new Cookie("authToken", token);
        tokenCookie.setHttpOnly(true); // Chỉ có thể truy cập từ phía server (không thể đọc từ JavaScript)
        tokenCookie.setSecure(true);   // Chỉ gửi cookie qua HTTPS (khi bạn sử dụng HTTPS)
        tokenCookie.setPath("/");      // Cookie sẽ có sẵn trên tất cả các URL của trang
        tokenCookie.setMaxAge(7 * 24 * 60 * 60); // Cookie có hiệu lực trong 7 ngày
        response.addCookie(tokenCookie);

        // Chuyển hướng đến frontend
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:3000")).build();
    }

}

