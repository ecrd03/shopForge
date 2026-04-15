package com.shopforge.backend.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopforge.backend.model.Product;
import com.shopforge.backend.model.ProductImageRequest;
import com.shopforge.backend.model.ProductResponse;
import com.shopforge.backend.model.ProductSaveRequest;
import com.shopforge.backend.repo.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository products;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ProductController(ProductRepository products) {
        this.products = products;
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
        product.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        product.setBuyingLink(request.getBuyingLink());
        product.setImagesJson(toJson(request.getImages()));
        product.setCategoryTagsJson(toJson(request.getCategoryTags()));
        product.setSearchTagsJson(toJson(request.getSearchTags()));

        Product savedProduct = products.save(product);
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
        existingProduct.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        existingProduct.setBuyingLink(request.getBuyingLink());
        existingProduct.setImagesJson(toJson(request.getImages()));
        existingProduct.setCategoryTagsJson(toJson(request.getCategoryTags()));
        existingProduct.setSearchTagsJson(toJson(request.getSearchTags()));

        Product savedProduct = products.save(existingProduct);
        return buildProductResponse(savedProduct);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        products.deleteById(id);
    }

    private ProductResponse buildProductResponse(Product product) {
        ProductResponse item = new ProductResponse();
        item.setId(product.getId());
        item.setShopId(product.getShopId());
        item.setName(product.getName());
        item.setPrice(product.getPrice());
        item.setStock(product.getStock());
        item.setIsActive(product.getIsActive());
        item.setBuyingLink(product.getBuyingLink());
        item.setImages(fromImageJson(product.getImagesJson()));
        item.setCategoryTags(fromJson(product.getCategoryTagsJson()));
        item.setSearchTags(fromJson(product.getSearchTagsJson()));
        return item;
    }

    private String toJson(Object values) {
        try {
            return objectMapper.writeValueAsString(values == null ? new ArrayList<>() : values);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save json data");
        }
    }

    private List<String> fromJson(String json) {
        try {
            if (json == null || json.isBlank()) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private List<ProductImageRequest> fromImageJson(String json) {
        try {
            if (json == null || json.isBlank()) {
                return new ArrayList<>();
            }

            String trimmedJson = json.trim();

            if (trimmedJson.startsWith("[\"")) {
                List<String> oldUrls = objectMapper.readValue(
                        trimmedJson,
                        new TypeReference<List<String>>() {}
                );

                List<ProductImageRequest> convertedImages = new ArrayList<>();

                for (int i = 0; i < oldUrls.size(); i++) {
                    String url = oldUrls.get(i);

                    ProductImageRequest image = new ProductImageRequest();
                    image.setId("legacy-image-" + i);
                    image.setPreview(url);
                    image.setUrl(url);
                    image.setPath("");

                    convertedImages.add(image);
                }

                return convertedImages;
            }

            return objectMapper.readValue(
                    trimmedJson,
                    new TypeReference<List<ProductImageRequest>>() {}
            );
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}