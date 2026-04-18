package com.shopforge.backend.config;

import com.shopforge.backend.model.Role;
import com.shopforge.backend.model.User;
import com.shopforge.backend.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(UserRepository users, PasswordEncoder encoder) {
        return args -> {
            if (users.findByEmail("ecrd0321@gmail.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("ecrd0321@gmail.com");
                admin.setUsername("admin");
                admin.setPasswordHash(encoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                admin.setActive(true);
                users.save(admin);
            }

            if (users.findByEmail("owner@shopforge.com").isEmpty()) {
                User owner = new User();
                owner.setEmail("owner@shopforge.com");
                owner.setUsername("owner");
                owner.setPasswordHash(encoder.encode("owner123"));
                owner.setRole(Role.SHOP_OWNER);
                owner.setShopId(1L);
                owner.setActive(true);
                users.save(owner);
            }
        };
    }
}