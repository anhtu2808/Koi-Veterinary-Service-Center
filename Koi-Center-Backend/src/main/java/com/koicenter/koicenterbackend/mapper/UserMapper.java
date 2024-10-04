package com.koicenter.koicenterbackend.mapper;

import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.model.request.authentication.RegisterRequest;
import com.koicenter.koicenterbackend.model.request.user.UserRequest;
import com.koicenter.koicenterbackend.model.response.user.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper  {
  //  User toUser(UserRequest userRequest);
   @Mapping(target = "role", ignore = true)
    User toUser(RegisterRequest user);
   @Mapping(source = "userId",target = "user_id")
   @Mapping(target = "customer", ignore = true)
   @Mapping(target = "veterinarian",ignore = true)
   UserResponse toUserResponse(User user);

}
