package com.shopforge.backend.controllers;

import com.shopforge.backend.model.ProductTag;
import com.shopforge.backend.model.ProductTagId;
import com.shopforge.backend.repo.ProductTagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-tags")
public class ProductTagController {

    private final ProductTagRepository productTags;

    public ProductTagController(ProductTagRepository productTags) {
        this.productTags = productTags;
    }

    @PostMapping
    public ProductTag attach(@RequestBody ProductTagId body) {
        ProductTag row = new ProductTag(new ProductTagId(body.getProductId(), body.getTagId()));
        return productTags.save(row);
    }

    @GetMapping("/product/{productId}")
    public List<ProductTag> byProduct(@PathVariable Long productId) {
        return productTags.findByIdProductId(productId);
    }
}