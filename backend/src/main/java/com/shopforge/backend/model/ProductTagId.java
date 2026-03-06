package com.shopforge.backend.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProductTagId implements Serializable {

    private Long productId;
    private Long tagId;

    public ProductTagId() {}

    public ProductTagId(Long productId, Long tagId) {
        this.productId = productId;
        this.tagId = tagId;
    }

    public Long getProductId() { return productId; }
    public Long getTagId() { return tagId; }

    public void setProductId(Long productId) { this.productId = productId; }
    public void setTagId(Long tagId) { this.tagId = tagId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductTagId that)) return false;
        return Objects.equals(productId, that.productId) && Objects.equals(tagId, that.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, tagId);
    }
}