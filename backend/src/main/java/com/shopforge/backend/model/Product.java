package com.shopforge.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shop_id", nullable = false)
    private Long shopId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "buying_link")
    private String buyingLink;

    @Lob
    @Column(name = "images_json")
    private String imagesJson;

    @Lob
    @Column(name = "category_tags_json")
    private String categoryTagsJson;

    @Lob
    @Column(name = "search_tags_json")
    private String searchTagsJson;

    public String getCategoryTagsJson() { return categoryTagsJson; }
    public String getSearchTagsJson() { return searchTagsJson; }

    public void setCategoryTagsJson(String categoryTagsJson) { this.categoryTagsJson = categoryTagsJson; }
    public void setSearchTagsJson(String searchTagsJson) { this.searchTagsJson = searchTagsJson; }

    public Long getId() { return id; }
    public Long getShopId() { return shopId; }
    public String getName() { return name; }
    public BigDecimal getPrice() { return price; }
    public Integer getStock() { return stock; }
    public Boolean getIsActive() { return isActive; }
    public String getBuyingLink() { return buyingLink; }
    public String getImagesJson() { return imagesJson; }

    public void setShopId(Long shopId) { this.shopId = shopId; }
    public void setName(String name) { this.name = name; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setStock(Integer stock) { this.stock = stock; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public void setBuyingLink(String buyingLink) { this.buyingLink = buyingLink; }
    public void setImagesJson(String imagesJson) { this.imagesJson = imagesJson; }
}