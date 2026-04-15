package com.shopforge.backend.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductResponse {
    private Long id;
    private Long shopId;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private Boolean isActive;
    private String buyingLink;
    private List<String> images = new ArrayList<>();
    private List<String> categoryTags = new ArrayList<>();
    private List<String> searchTags = new ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getShopId() { return shopId; }
    public void setShopId(Long shopId) { this.shopId = shopId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public String getBuyingLink() { return buyingLink; }
    public void setBuyingLink(String buyingLink) { this.buyingLink = buyingLink; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public List<String> getCategoryTags() { return categoryTags; }
    public void setCategoryTags(List<String> categoryTags) { this.categoryTags = categoryTags; }

    public List<String> getSearchTags() { return searchTags; }
    public void setSearchTags(List<String> searchTags) { this.searchTags = searchTags; }
}