package com.shopforge.backend.repo;

import com.shopforge.backend.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<Shop, Long> {
}