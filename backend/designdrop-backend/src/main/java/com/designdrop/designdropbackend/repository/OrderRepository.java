package com.designdrop.designdropbackend.repository;

import com.designdrop.designdropbackend.entity.Order;
import com.designdrop.designdropbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyer(User buyer);
}