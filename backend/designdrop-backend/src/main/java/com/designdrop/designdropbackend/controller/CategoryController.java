package com.designdrop.designdropbackend.controller;

import com.designdrop.designdropbackend.entity.Category;
import com.designdrop.designdropbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class CategoryController {

    private final CategoryRepository categoryRepository;

    // GET /api/categories — get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    // POST /api/categories — add a new category
    @PostMapping
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        try {
            Category saved = categoryRepository.save(category);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Category already exists");
        }
    }
}
