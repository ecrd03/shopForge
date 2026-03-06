package com.shopforge.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shop_id", nullable = false)
    private Long shopId;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "tag_type", nullable = false)
    private TagType tagType;

    public Long getId() { return id; }
    public Long getShopId() { return shopId; }
    public String getName() { return name; }
    public TagType getTagType() { return tagType; }

    public void setShopId(Long shopId) { this.shopId = shopId; }
    public void setName(String name) { this.name = name; }
    public void setTagType(TagType tagType) { this.tagType = tagType; }
}