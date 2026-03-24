package com.shopforge.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shops")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    private String theme;

    private String instagramUrl;
    private String facebookUrl;
    private String twitterUrl;
    private String tiktokUrl;
    private String etsyUrl;
    private String shopifyUrl;
    private String depopUrl;
    private String ebayUrl;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getLogoUrl() { return logoUrl; }
    public Long getOwnerId() { return ownerId; }
    public String getTheme() { return theme; }

    public String getInstagramUrl() { return instagramUrl; }
    public String getFacebookUrl() { return facebookUrl; }
    public String getTwitterUrl() { return twitterUrl; }
    public String getTiktokUrl() { return tiktokUrl; }
    public String getEtsyUrl() { return etsyUrl; }
    public String getShopifyUrl() { return shopifyUrl; }
    public String getDepopUrl() { return depopUrl; }
    public String getEbayUrl() { return ebayUrl; }

    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public void setTheme(String theme) { this.theme = theme; }

    public void setInstagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; }
    public void setFacebookUrl(String facebookUrl) { this.facebookUrl = facebookUrl; }
    public void setTwitterUrl(String twitterUrl) { this.twitterUrl = twitterUrl; }
    public void setTiktokUrl(String tiktokUrl) { this.tiktokUrl = tiktokUrl; }
    public void setEtsyUrl(String etsyUrl) { this.etsyUrl = etsyUrl; }
    public void setShopifyUrl(String shopifyUrl) { this.shopifyUrl = shopifyUrl; }
    public void setDepopUrl(String depopUrl) { this.depopUrl = depopUrl; }
    public void setEbayUrl(String ebayUrl) { this.ebayUrl = ebayUrl; }
}