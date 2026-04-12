package com.shopforge.backend.controllers;

import com.shopforge.backend.model.Shop;
import com.shopforge.backend.repo.ProductRepository;
import com.shopforge.backend.repo.ShopRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopforge.backend.model.CustomCategorySaveRequest;
import com.shopforge.backend.model.CustomCategoryResponse;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "http://localhost:5173")
public class ShopController {

    private final ShopRepository shops;
    private final ProductRepository products;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ShopController(ShopRepository shops, ProductRepository products) {
        this.shops = shops;
        this.products = products;
    }

    @GetMapping
    public List<ShopSummary> list() {
        return shops.findAll().stream()
                .map(shop -> new ShopSummary(
                        shop.getId(),
                        shop.getName(),
                        shop.getDescription(),
                        shop.getTheme(),
                        shop.getLogoUrl(),
                        shop.getInstagramUrl(),
                        shop.getFacebookUrl(),
                        shop.getTwitterUrl(),
                        shop.getTiktokUrl(),
                        shop.getEtsyUrl(),
                        shop.getShopifyUrl(),
                        shop.getDepopUrl(),
                        shop.getEbayUrl(),
                        products.countByShopId(shop.getId())
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shop> getById(@PathVariable Long id) {
        return shops.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Shop create(@RequestBody Shop shop) {
        return shops.save(shop);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shop> update(@PathVariable Long id, @RequestBody Shop updatedShop) {
        return shops.findById(id)
                .map(existingShop -> {
                    existingShop.setName(updatedShop.getName());
                    existingShop.setDescription(updatedShop.getDescription());
                    existingShop.setTheme(updatedShop.getTheme());
                    existingShop.setLogoUrl(updatedShop.getLogoUrl());

                    existingShop.setInstagramUrl(updatedShop.getInstagramUrl());
                    existingShop.setFacebookUrl(updatedShop.getFacebookUrl());
                    existingShop.setTwitterUrl(updatedShop.getTwitterUrl());
                    existingShop.setTiktokUrl(updatedShop.getTiktokUrl());
                    existingShop.setEtsyUrl(updatedShop.getEtsyUrl());
                    existingShop.setShopifyUrl(updatedShop.getShopifyUrl());
                    existingShop.setDepopUrl(updatedShop.getDepopUrl());
                    existingShop.setEbayUrl(updatedShop.getEbayUrl());

                    existingShop.setInstagramEnabled(updatedShop.getInstagramEnabled());
                    existingShop.setFacebookEnabled(updatedShop.getFacebookEnabled());
                    existingShop.setTwitterEnabled(updatedShop.getTwitterEnabled());
                    existingShop.setTiktokEnabled(updatedShop.getTiktokEnabled());
                    existingShop.setEtsyEnabled(updatedShop.getEtsyEnabled());
                    existingShop.setShopifyEnabled(updatedShop.getShopifyEnabled());
                    existingShop.setDepopEnabled(updatedShop.getDepopEnabled());
                    existingShop.setEbayEnabled(updatedShop.getEbayEnabled());

                    return ResponseEntity.ok(shops.save(existingShop));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    public static class ShopSummary {
        public Long id;
        public String name;
        public String description;
        public String theme;
        public String logoUrl;
        public String instagramUrl;
        public String facebookUrl;
        public String twitterUrl;
        public String tiktokUrl;
        public String etsyUrl;
        public String shopifyUrl;
        public String depopUrl;
        public String ebayUrl;
        public long productCount;

        public ShopSummary(
                Long id,
                String name,
                String description,
                String theme,
                String logoUrl,
                String instagramUrl,
                String facebookUrl,
                String twitterUrl,
                String tiktokUrl,
                String etsyUrl,
                String shopifyUrl,
                String depopUrl,
                String ebayUrl,
                long productCount
        ) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.theme = theme;
            this.logoUrl = logoUrl;
            this.instagramUrl = instagramUrl;
            this.facebookUrl = facebookUrl;
            this.twitterUrl = twitterUrl;
            this.tiktokUrl = tiktokUrl;
            this.etsyUrl = etsyUrl;
            this.shopifyUrl = shopifyUrl;
            this.depopUrl = depopUrl;
            this.ebayUrl = ebayUrl;
            this.productCount = productCount;
        }
    }

    @PutMapping("/{id}/custom-category")
    public CustomCategoryResponse updateCustomCategory(
            @PathVariable Long id,
            @RequestBody CustomCategorySaveRequest request
    ) {
        Shop shop = shops.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        // save toggle
        shop.setCustomCategoryEnabled(
                request.getEnabled() != null ? request.getEnabled() : false
        );

        // save lines as JSON
        try {
            String linesJson = objectMapper.writeValueAsString(
                    request.getLines() == null ? new ArrayList<>() : request.getLines()
            );
            shop.setCustomCategoryLines(linesJson);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save custom category");
        }

        Shop savedShop = shops.save(shop);

        // build response
        CustomCategoryResponse response = new CustomCategoryResponse();
        response.setEnabled(savedShop.getCustomCategoryEnabled());

        try {
            List<List<String>> lines = objectMapper.readValue(
                    savedShop.getCustomCategoryLines(),
                    new TypeReference<List<List<String>>>() {}
            );
            response.setLines(lines);
        } catch (Exception e) {
            response.setLines(new ArrayList<>());
        }

        return response;
    }
}