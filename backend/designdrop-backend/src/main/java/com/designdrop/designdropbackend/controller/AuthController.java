package com.designdrop.designdropbackend.controller;

import com.designdrop.designdropbackend.dto.LoginRequest;
import com.designdrop.designdropbackend.dto.RegisterRequest;
import com.designdrop.designdropbackend.entity.User;
import com.designdrop.designdropbackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend to call this API
public class AuthController {

    private final AuthService authService;

    // POST /api/auth/register — creates a new user account
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.register(request);
            return ResponseEntity.ok("User registered successfully with role: " + user.getRole());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // POST /api/auth/login — placeholder for now, will add JWT later
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok("Login endpoint coming soon");
    }
}
