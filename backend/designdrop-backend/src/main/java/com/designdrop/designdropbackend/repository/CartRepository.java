package com.designdrop.designdropbackend.repository;

import com.designdrop.designdropbackend.entity.Cart;
import com.designdrop.designdropbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // Find cart by user
    Optional<Cart> findByUser(User user);
}
