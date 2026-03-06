package com.shopforge.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "product_tags")
public class ProductTag {

    @EmbeddedId
    private ProductTagId id;

    public ProductTag() {}

    public ProductTag(ProductTagId id) {
        this.id = id;
    }

    public ProductTagId getId() { return id; }
    public void setId(ProductTagId id) { this.id = id; }
}