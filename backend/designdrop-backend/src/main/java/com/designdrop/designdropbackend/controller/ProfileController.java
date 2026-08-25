package com.designdrop.designdropbackend.controller;

import com.designdrop.designdropbackend.entity.Listing;
import com.designdrop.designdropbackend.entity.User;
import com.designdrop.designdropbackend.repository.ListingRepository;
import com.designdrop.designdropbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class ProfileController {

    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    // GET /api/profile/{email} — get designer profile and their listings
    @GetMapping("/{email}")
    public ResponseEntity<?> getProfile(@PathVariable String email) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Get approved listings by this seller
            List<Listing> listings = listingRepository.findBySeller(user)
                    .stream()
                    .filter(l -> l.getStatus() == Listing.ListingStatus.APPROVED)
                    .toList();

            // Build response
            Map<String, Object> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            response.put("listings", listings);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}