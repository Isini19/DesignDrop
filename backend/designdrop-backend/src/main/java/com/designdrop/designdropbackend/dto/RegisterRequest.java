package com.designdrop.designdropbackend.dto;


import com.designdrop.designdropbackend.entity.User;
import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private User.Role role;
}


//user signup