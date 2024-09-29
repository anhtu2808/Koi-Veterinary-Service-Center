package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.exception.AppException;
import com.koicenter.koicenterbackend.exception.ErrorCode;
import com.koicenter.koicenterbackend.model.entity.Customer;
import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.entity.Veterinarian;
import com.koicenter.koicenterbackend.model.enums.Role;
import com.koicenter.koicenterbackend.model.enums.VeterinarianStatus;
import com.koicenter.koicenterbackend.model.request.RegisterRequest;
import com.koicenter.koicenterbackend.model.response.UserResponse;

import com.koicenter.koicenterbackend.model.response.VeterinarianDTO;
import com.koicenter.koicenterbackend.repository.CustomerRepository;
import com.koicenter.koicenterbackend.repository.UserRepository;
import com.koicenter.koicenterbackend.repository.VeterinarianRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    VeterinarianRepository veterinarianRepository;

    @Value("${myapp.api-key}")
    private String privateKey;

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
        user.setFullName(newUser.getFullname());
        user.setRole(Role.CUSTOMER);
        user.setStatus(true);
        userRepository.save(user);


        if (user.getRole() == Role.CUSTOMER) {
            Customer customer = new Customer();
            customer.setUser(user);
            customerRepository.save(customer);
        }
    }


    public boolean getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return false;
        }
        return true;
    }


    public UserResponse getMyInfo(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String username;
        try {
            SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
            Jws<Claims> jws = Jwts.parser() // Use parserBuilder() instead of parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            username = jws.getBody().getSubject();
        } catch (Exception e) {
            throw new AppException(ErrorCode.INVALID_TOKEN.getCode(), ErrorCode.INVALID_TOKEN.getMessage(), HttpStatus.FORBIDDEN);
        }

        return getUserByUsernameV2(username);
    }

    private UserResponse getUserByUsernameV2(String username) {

        User user = userRepository.findByUsername(username);
        UserResponse.UserResponseBuilder userResponseBuilder = UserResponse.builder()

                .user_id(user.getUserId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .role(user.getRole())
                .status(user.isStatus())
                .email(user.getEmail());

        if (user.getRole() == Role.CUSTOMER) {
            CustomerDTO customerDTO = new CustomerDTO(
                    user.getCustomer().getCustomerId(),
                    user.getCustomer().getAddress(),
                    user.getCustomer().getPhone(),
                    user.getCustomer().getImage()
            );
            userResponseBuilder.customer(customerDTO);
        }

        if (user.getRole() == Role.VETERINARIAN && user.getVeterinarian() != null) {
            VeterinarianDTO veterinarianDTO = new VeterinarianDTO(
                    user.getVeterinarian().getVetId(),
                    user.getVeterinarian().getDescription(),
                    user.getVeterinarian().getGoogleMeet(),
                    user.getVeterinarian().getImage(),
                    user.getVeterinarian().getPhone(),
                    user.getVeterinarian().getVeterinarianStatus().name(),
                    user.getVeterinarian().getStatus()
            );
            userResponseBuilder.veterinarian(veterinarianDTO);
        }
        return userResponseBuilder.build();
    }
}
