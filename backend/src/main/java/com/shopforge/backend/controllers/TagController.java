package com.shopforge.backend.controllers;

import com.shopforge.backend.model.Tag;
import com.shopforge.backend.model.TagType;
import com.shopforge.backend.repo.TagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagRepository tags;

    public TagController(TagRepository tags) {
        this.tags = tags;
    }

    @GetMapping("/shop/{shopId}")
    public List<Tag> byShop(@PathVariable Long shopId) {
        return tags.findByShopId(shopId);
    }

    @GetMapping("/shop/{shopId}/type/{type}")
    public List<Tag> byShopAndType(@PathVariable Long shopId, @PathVariable TagType type) {
        return tags.findByShopIdAndTagType(shopId, type);
    }

    @PostMapping
    public Tag create(@RequestBody Tag tag) {
        return tags.save(tag);
    }
}