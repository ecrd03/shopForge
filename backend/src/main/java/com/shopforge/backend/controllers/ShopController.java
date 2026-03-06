package com.shopforge.backend.controllers;

import com.shopforge.backend.model.Shop;
import com.shopforge.backend.repo.ShopRepository;
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

    @PostMapping
    public Shop create(@RequestBody Shop shop) {
        return shops.save(shop);
    }
}