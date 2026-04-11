package com.shopforge.backend.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopforge.backend.model.Product;
import com.shopforge.backend.model.ProductResponse;
import com.shopforge.backend.model.ProductSaveRequest;
import com.shopforge.backend.model.ProductTag;
import com.shopforge.backend.model.ProductTagId;
import com.shopforge.backend.model.Tag;
import com.shopforge.backend.model.TagType;
import com.shopforge.backend.repo.ProductRepository;
import com.shopforge.backend.repo.ProductTagRepository;
import com.shopforge.backend.repo.TagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository products;
    private final TagRepository tags;
    private final ProductTagRepository productTags;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ProductController(
            ProductRepository products,
            TagRepository tags,
            ProductTagRepository productTags
    ) {
        this.products = products;
        this.tags = tags;
        this.productTags = productTags;
    }

    @GetMapping("/shop/{shopId}")
    public List<ProductResponse> byShop(@PathVariable Long shopId) {
        List<Product> shopProducts = products.findByShopId(shopId);
        List<ProductResponse> response = new ArrayList<>();

        for (Product product : shopProducts) {
            response.add(buildProductResponse(product));
        }

        return response;
    }

    @PostMapping
    public ProductResponse create(@RequestBody ProductSaveRequest request) {
        Product product = new Product();
        product.setShopId(request.getShopId());
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImagesJson(toJson(request.getImages()));

        Product savedProduct = products.save(product);
        saveTagsForProduct(savedProduct, request);

        return buildProductResponse(savedProduct);
    }

    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @RequestBody ProductSaveRequest request) {
        Product existingProduct = products.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setShopId(request.getShopId());
        existingProduct.setName(request.getName());
        existingProduct.setPrice(request.getPrice());
        existingProduct.setStock(request.getStock());
        existingProduct.setImagesJson(toJson(request.getImages()));

        Product savedProduct = products.save(existingProduct);

        productTags.deleteByIdProductId(savedProduct.getId());
        saveTagsForProduct(savedProduct, request);

        return buildProductResponse(savedProduct);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productTags.deleteByIdProductId(id);
        products.deleteById(id);
    }

    private void saveTagsForProduct(Product product, ProductSaveRequest request) {
        saveTagList(product, request.getCategoryTags(), TagType.CATEGORY);
        saveTagList(product, request.getSearchTags(), TagType.SEARCH);
    }

    private void saveTagList(Product product, List<String> tagNames, TagType tagType) {
        if (tagNames == null) return;

        for (String rawName : tagNames) {
            if (rawName == null) continue;

            String name = rawName.trim();
            if (name.isEmpty()) continue;

            Tag tag = tags.findByShopIdAndNameAndTagType(product.getShopId(), name, tagType)
                    .orElseGet(() -> {
                        Tag newTag = new Tag();
                        newTag.setShopId(product.getShopId());
                        newTag.setName(name);
                        newTag.setTagType(tagType);
                        return tags.save(newTag);
                    });

            ProductTag link = new ProductTag(new ProductTagId(product.getId(), tag.getId()));
            productTags.save(link);
        }
    }

    private ProductResponse buildProductResponse(Product product) {
        ProductResponse item = new ProductResponse();
        item.setId(product.getId());
        item.setShopId(product.getShopId());
        item.setName(product.getName());
        item.setPrice(product.getPrice());
        item.setStock(product.getStock());
        item.setImages(fromJson(product.getImagesJson()));

        List<ProductTag> links = productTags.findByIdProductId(product.getId());

        List<String> categoryTags = new ArrayList<>();
        List<String> searchTags = new ArrayList<>();

        for (ProductTag link : links) {
            Tag tag = tags.findById(link.getId().getTagId()).orElse(null);
            if (tag == null) continue;

            if (tag.getTagType() == TagType.CATEGORY) {
                categoryTags.add(tag.getName());
            } else if (tag.getTagType() == TagType.SEARCH) {
                searchTags.add(tag.getName());
            }
        }

        item.setCategoryTags(categoryTags);
        item.setSearchTags(searchTags);

        return item;
    }

    private String toJson(List<String> images) {
        try {
            return objectMapper.writeValueAsString(images == null ? new ArrayList<>() : images);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save images");
        }
    }

    private List<String> fromJson(String imagesJson) {
        try {
            if (imagesJson == null || imagesJson.isBlank()) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(imagesJson, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}