package com.shopforge.backend.controllers;

import com.shopforge.backend.model.Shop;
import com.shopforge.backend.repo.ShopRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    private final ShopRepository shops;

    public ShopController(ShopRepository shops) {
        this.shops = shops;
    }

    @GetMapping
    public List<Shop> list() {
        return shops.findAll();
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
}