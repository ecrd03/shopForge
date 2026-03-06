package com.shopforge.backend.repo;

import com.shopforge.backend.model.ProductTag;
import com.shopforge.backend.model.ProductTagId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductTagRepository extends JpaRepository<ProductTag, ProductTagId> {
    List<ProductTag> findByIdProductId(Long productId);
}