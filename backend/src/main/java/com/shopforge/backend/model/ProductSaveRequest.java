package com.shopforge.backend.model;

import java.math.BigDecimal;
import java.util.List;

public class ProductSaveRequest {

    private Long shopId;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private List<String> categoryTags;
    private List<String> searchTags;

    public Long getShopId() { return shopId; }
    public String getName() { return name; }
    public BigDecimal getPrice() { return price; }
    public Integer getStock() { return stock; }
    public List<String> getCategoryTags() { return categoryTags; }
    public List<String> getSearchTags() { return searchTags; }

    public void setShopId(Long shopId) { this.shopId = shopId; }
    public void setName(String name) { this.name = name; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setStock(Integer stock) { this.stock = stock; }
    public void setCategoryTags(List<String> categoryTags) { this.categoryTags = categoryTags; }
    public void setSearchTags(List<String> searchTags) { this.searchTags = searchTags; }
}