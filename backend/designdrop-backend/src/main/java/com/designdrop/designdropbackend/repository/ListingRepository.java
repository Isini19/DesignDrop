package com.designdrop.designdropbackend.repository;



import com.designdrop.designdropbackend.entity.Listing;
import com.designdrop.designdropbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findBySeller(User seller);
    List<Listing> findByStatus(Listing.ListingStatus status);
    List<Listing> findByCategoryName(String categoryName);
}