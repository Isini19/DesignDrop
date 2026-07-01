package com.designdrop.designdropbackend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}

//user login