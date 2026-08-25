package com.designdrop.designdropbackend.controller;

import com.designdrop.designdropbackend.dto.ListingRequest;
import com.designdrop.designdropbackend.entity.Listing;
import com.designdrop.designdropbackend.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.designdrop.designdropbackend.repository.ListingRepository;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class ListingController {

    private final ListingService listingService;
    private final ListingRepository listingRepository;

    // POST /api/listings/create — seller creates a new listing
    @PostMapping("/create")
    public ResponseEntity<?> createListing(
            @RequestBody ListingRequest request,
            @RequestParam String sellerEmail) {
        try {
            Listing listing = listingService.createListing(request, sellerEmail);
            return ResponseEntity.ok("Listing created successfully, pending admin approval");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET /api/listings — get all approved listings for browse page
    @GetMapping
    public ResponseEntity<List<Listing>> getApprovedListings() {
        return ResponseEntity.ok(listingService.getApprovedListings());
    }

    // GET /api/listings/seller?email=xxx — get all listings by a seller
    @GetMapping("/seller")
    public ResponseEntity<List<Listing>> getSellerListings(
            @RequestParam String email) {
        return ResponseEntity.ok(listingService.getSellerListings(email));
    }

    // GET /api/listings/pending — admin sees all pending listings
    @GetMapping("/pending")
    public ResponseEntity<List<Listing>> getPendingListings() {
        return ResponseEntity.ok(listingService.getPendingListings());
    }

    // GET /api/listings/{id} — get single listing by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getListingById(@PathVariable Long id) {
        try {
            Listing listing = listingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Listing not found"));
            return ResponseEntity.ok(listing);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /api/listings/{id}/approve — admin approves a listing
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveListing(@PathVariable Long id) {
        try {
            Listing listing = listingService.approveListing(id);
            return ResponseEntity.ok("Listing approved: " + listing.getTitle());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /api/listings/{id}/reject — admin rejects a listing
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectListing(@PathVariable Long id) {
        try {
            Listing listing = listingService.rejectListing(id);
            return ResponseEntity.ok("Listing rejected: " + listing.getTitle());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
