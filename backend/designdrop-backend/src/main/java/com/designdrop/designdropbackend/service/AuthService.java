package com.designdrop.designdropbackend.service;

import com.designdrop.designdropbackend.dto.RegisterRequest;
import com.designdrop.designdropbackend.entity.Cart;
import com.designdrop.designdropbackend.entity.User;
import com.designdrop.designdropbackend.repository.CartRepository;
import com.designdrop.designdropbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    // Injected dependencies
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;

    // Handles new user registration
    public User register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user and hash the password
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        // Save user to database
        User savedUser = userRepository.save(user);

        // Automatically create a cart for the new user
        Cart cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);

        return savedUser;
    }
}