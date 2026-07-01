package com.designdrop.designdropbackend.service;



import com.designdrop.designdropbackend.dto.ListingRequest;
import com.designdrop.designdropbackend.entity.Category;
import com.designdrop.designdropbackend.entity.Listing;
import com.designdrop.designdropbackend.entity.User;
import com.designdrop.designdropbackend.repository.CategoryRepository;
import com.designdrop.designdropbackend.repository.ListingRepository;
import com.designdrop.designdropbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    // Create a new listing
    public Listing createListing(ListingRequest request, String sellerEmail) {

        // Find the seller by email
        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        // Find the category by ID
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Build the listing object
        Listing listing = new Listing();
        listing.setSeller(seller);
        listing.setCategory(category);
        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setListingType(request.getListingType());
        listing.setStockQuantity(request.getStockQuantity());
        listing.setImageUrl(request.getImageUrl());
        // Status defaults to PENDING — admin must approve before it goes live

        return listingRepository.save(listing);
    }

    // Get all approved/active listings for the browse page
    public List<Listing> getApprovedListings() {
        return listingRepository.findByStatus(Listing.ListingStatus.APPROVED);
    }

    // Get all listings by a specific seller
    public List<Listing> getSellerListings(String sellerEmail) {
        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
        return listingRepository.findBySeller(seller);
    }

    // Get all pending listings for admin review
    public List<Listing> getPendingListings() {
        return listingRepository.findByStatus(Listing.ListingStatus.PENDING);
    }

    // Admin approves a listing
    public Listing approveListing(Long listingId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        listing.setStatus(Listing.ListingStatus.APPROVED);
        return listingRepository.save(listing);
    }

    // Admin rejects a listing
    public Listing rejectListing(Long listingId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        listing.setStatus(Listing.ListingStatus.REJECTED);
        return listingRepository.save(listing);
    }
}
