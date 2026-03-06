package com.shopforge.backend.controllers;

import com.shopforge.backend.model.Product;
import com.shopforge.backend.repo.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository products;

    public ProductController(ProductRepository products) {
        this.products = products;
    }

    @GetMapping("/shop/{shopId}")
    public List<Product> byShop(@PathVariable Long shopId) {
        return products.findByShopId(shopId);
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return products.save(product);
    }
}