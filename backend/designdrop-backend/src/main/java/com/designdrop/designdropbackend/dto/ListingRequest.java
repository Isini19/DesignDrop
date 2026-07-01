package com.designdrop.designdropbackend.dto;

import com.designdrop.designdropbackend.entity.Listing;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ListingRequest {
    private String title;
    private String description;
    private BigDecimal price;
    private Listing.ListingType listingType;
    private Integer stockQuantity;
    private String imageUrl;
    private Long categoryId;
}