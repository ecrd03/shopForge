package com.shopforge.backend.controllers;

import com.shopforge.backend.model.Shop;
import com.shopforge.backend.repo.ProductRepository;
import com.shopforge.backend.repo.ShopRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "http://localhost:5173")
public class ShopController {

    private final ShopRepository shops;
    private final ProductRepository products;

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
}