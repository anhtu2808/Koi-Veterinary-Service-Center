package com.koicenter.koicenterbackend.service;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
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

    public GoogleIdToken verifyGoogleToken(String token) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList("675554674661-qaklq95eac0uhmjjh9bikdc2i1d6bcg6.apps.googleusercontent.com"))
                .build();

        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(token);
        } catch (Exception e) {
            throw new RuntimeException("Invalid Google token", e);
        }

        if (idToken == null) {
            throw new RuntimeException("Google token verification failed");
        }

        return idToken;
    }
    public String loginGoogleReturnToken(GoogleIdToken.Payload payload) {
        // Lấy các thông tin từ payload
        String email = (String) payload.getEmail();  // Lấy email từ payload
        String fullName = (String) payload.get("name");  // Tên đầy đủ từ payload
        String image = (String) payload.get("picture");  // Hình ảnh đại diện của người dùng
        String username = (String) payload.get("given_name");  // Lấy tên người dùng

        // Kiểm tra email có tồn tại không, nếu không thì ném lỗi
        if (email == null || email.isEmpty()) {
            throw new AppException(ErrorCode.INVALID_LOGIN.getCode(), "Email is required for login.", HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra người dùng trong cơ sở dữ liệu
        User user = userRepository.findByEmail(email);

        // Nếu người dùng đã tồn tại, tạo JWT token cho họ
        if (user != null) {
            return jWTUtilHelper.generateTokenGmail(user);
        }

        // Nếu người dùng chưa tồn tại, tạo người dùng mới
        user = new User();
        user.setUsername(email);  // Thiết lập tên người dùng
        user.setFullName(fullName);  // Thiết lập tên đầy đủ
        user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));  // Tạo mật khẩu ngẫu nhiên
        user.setImage(image);  // Thiết lập ảnh đại diện
        user.setEmail(email);  // Thiết lập email
        user.setStatus(true);  // Thiết lập trạng thái kích hoạt
        user.setRole(Role.CUSTOMER);  // Gán vai trò người dùng là "CUSTOMER"

        // Lưu người dùng mới vào cơ sở dữ liệu
        userRepository.save(user);

        // Nếu người dùng có vai trò "CUSTOMER", tạo bản ghi khách hàng
        if (user.getRole() == Role.CUSTOMER) {
            Customer customer = new Customer();
            customer.setUser(user);  // Liên kết với đối tượng người dùng
            customerRepository.save(customer);  // Lưu thông tin khách hàng
        }

        // Tạo JWT token cho người dùng và trả về
        return jWTUtilHelper.generateTokenGmail(user);
    }

}
