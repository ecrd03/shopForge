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

    private String username;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "contact_phone")
    private String contactPhone;

    private String theme;

    private String instagramUrl;
    private String facebookUrl;
    private String twitterUrl;
    private String tiktokUrl;
    private String etsyUrl;
    private String shopifyUrl;
    private String depopUrl;
    private String ebayUrl;

    // NEW: enabled toggles
    @Column(name = "instagram_enabled", nullable = false)
    private Boolean instagramEnabled = true;

    @Column(name = "facebook_enabled", nullable = false)
    private Boolean facebookEnabled = true;

    @Column(name = "twitter_enabled", nullable = false)
    private Boolean twitterEnabled = true;

    @Column(name = "tiktok_enabled", nullable = false)
    private Boolean tiktokEnabled = true;

    @Column(name = "etsy_enabled", nullable = false)
    private Boolean etsyEnabled = true;

    @Column(name = "shopify_enabled", nullable = false)
    private Boolean shopifyEnabled = true;

    @Column(name = "depop_enabled", nullable = false)
    private Boolean depopEnabled = true;

    @Column(name = "ebay_enabled", nullable = false)
    private Boolean ebayEnabled = true;

    @Column(name = "custom_category_enabled", nullable = false)
    private Boolean customCategoryEnabled = false;

    @Lob
    @Column(name = "custom_category_lines", columnDefinition = "LONGTEXT")
    private String customCategoryLines;

    // GETTERS
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getLogoUrl() { return logoUrl; }
    public Long getOwnerId() { return ownerId; }
    public String getTheme() { return theme; }

    public String getUsername() { return username; }
    public String getContactName() { return contactName; }
    public String getContactEmail() { return contactEmail; }
    public String getContactPhone() { return contactPhone; }

    public String getInstagramUrl() { return instagramUrl; }
    public String getFacebookUrl() { return facebookUrl; }
    public String getTwitterUrl() { return twitterUrl; }
    public String getTiktokUrl() { return tiktokUrl; }
    public String getEtsyUrl() { return etsyUrl; }
    public String getShopifyUrl() { return shopifyUrl; }
    public String getDepopUrl() { return depopUrl; }
    public String getEbayUrl() { return ebayUrl; }

    public Boolean getInstagramEnabled() { return instagramEnabled; }
    public Boolean getFacebookEnabled() { return facebookEnabled; }
    public Boolean getTwitterEnabled() { return twitterEnabled; }
    public Boolean getTiktokEnabled() { return tiktokEnabled; }
    public Boolean getEtsyEnabled() { return etsyEnabled; }
    public Boolean getShopifyEnabled() { return shopifyEnabled; }
    public Boolean getDepopEnabled() { return depopEnabled; }
    public Boolean getEbayEnabled() { return ebayEnabled; }

    public Boolean getCustomCategoryEnabled() { return customCategoryEnabled; }
    public String getCustomCategoryLines() { return customCategoryLines; }

    // SETTERS
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

    public void setInstagramEnabled(Boolean instagramEnabled) { this.instagramEnabled = instagramEnabled; }
    public void setFacebookEnabled(Boolean facebookEnabled) { this.facebookEnabled = facebookEnabled; }
    public void setTwitterEnabled(Boolean twitterEnabled) { this.twitterEnabled = twitterEnabled; }
    public void setTiktokEnabled(Boolean tiktokEnabled) { this.tiktokEnabled = tiktokEnabled; }
    public void setEtsyEnabled(Boolean etsyEnabled) { this.etsyEnabled = etsyEnabled; }
    public void setShopifyEnabled(Boolean shopifyEnabled) { this.shopifyEnabled = shopifyEnabled; }
    public void setDepopEnabled(Boolean depopEnabled) { this.depopEnabled = depopEnabled; }
    public void setEbayEnabled(Boolean ebayEnabled) { this.ebayEnabled = ebayEnabled; }

    public void setCustomCategoryEnabled(Boolean customCategoryEnabled) {
        this.customCategoryEnabled = customCategoryEnabled;
    }

    public void setCustomCategoryLines(String customCategoryLines) {
        this.customCategoryLines = customCategoryLines;
    }
}