package com.shopforge.backend.repo;

import com.shopforge.backend.model.Tag;
import com.shopforge.backend.model.TagType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByShopId(Long shopId);

    List<Tag> findByShopIdAndTagType(Long shopId, TagType tagType);

}