package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.Role;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.request.RegisterRequest;
import com.koicenter.koicenterbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    public boolean getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return false;

        }
        return true;
    }

    public void createUser(RegisterRequest newUser) {
        User user = new User();
        user.setUsername(newUser.getUsername());
        user.setPassword(encoder.encode(newUser.getPassword()));
        user.setEmail(newUser.getEmail());
        user.setRole(Role.CUSTOMER);
        user.setStatus(true);
        userRepository.save(user);
    }

    public boolean getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return false;

        }
        return true;
    }


}
