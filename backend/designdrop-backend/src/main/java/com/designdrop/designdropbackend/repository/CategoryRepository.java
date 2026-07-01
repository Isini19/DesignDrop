package com.designdrop.designdropbackend.repository;

import com.designdrop.designdropbackend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Find category by name
    boolean existsByName(String name);
}
