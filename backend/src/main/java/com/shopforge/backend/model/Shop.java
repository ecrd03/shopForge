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

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getLogoUrl() { return logoUrl; }
    public Long getOwnerId() { return ownerId; }
    public String getTheme() { return theme; }

    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public void setTheme(String theme) { this.theme = theme; }
}