package com.koicenter.koicenterbackend.controller;

import com.koicenter.koicenterbackend.model.request.RegisterRequest;
import com.koicenter.koicenterbackend.model.response.ResponseObject;
import com.koicenter.koicenterbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseObject> register(@RequestBody RegisterRequest newUser) {
        try {
            if (userService.getUserByUsername(newUser.getUsername()) || userService.getUserByEmail(newUser.getEmail())) {
                return ResponseObject.APIRepsonse("409", "Username or email already exists", HttpStatus.CONFLICT, "");
            }
            userService.createUser(newUser);
            return ResponseObject.APIRepsonse("200", "User added successfully!", HttpStatus.CREATED, newUser);
        } catch (Exception e) {
            return ResponseObject.APIRepsonse("500", "An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, "");
        }
    }


}