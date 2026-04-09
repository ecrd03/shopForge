package com.shopforge.backend.controllers;

import com.shopforge.backend.model.Role;
import com.shopforge.backend.model.Shop;
import com.shopforge.backend.model.User;
import com.shopforge.backend.repo.ShopRepository;
import com.shopforge.backend.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository users;
    private final ShopRepository shops;
    private final PasswordEncoder encoder;

    public AuthController(UserRepository users, ShopRepository shops, PasswordEncoder encoder) {
        this.users = users;
        this.shops = shops;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.getOrDefault("username", "").trim();
        String email = body.getOrDefault("email", "").trim();
        String phone = body.getOrDefault("phone", "").trim();
        String password = body.getOrDefault("password", "");

        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "username, email, and password are required"));
        }

        if (users.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "email already exists"));
        }

        boolean usernameExists = users.findAll().stream()
                .anyMatch(user -> user.getUsername() != null && user.getUsername().equalsIgnoreCase(username));

        if (usernameExists) {
            return ResponseEntity.badRequest().body(Map.of("error", "username already exists"));
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPasswordHash(encoder.encode(password));
        user.setRole(Role.SHOP_OWNER);
        user.setActive(true);

        User savedUser = users.save(user);

        Shop shop = new Shop();
        shop.setName("My Shop");
        shop.setDescription("");
        shop.setLogoUrl("");
        shop.setOwnerId(savedUser.getId());
        shop.setTheme("Theme1");
        shop.setInstagramUrl("");
        shop.setFacebookUrl("");
        shop.setTwitterUrl("");
        shop.setTiktokUrl("");
        shop.setEtsyUrl("");
        shop.setShopifyUrl("");
        shop.setDepopUrl("");
        shop.setEbayUrl("");

        Shop savedShop = shops.save(shop);

        savedUser.setShopId(savedShop.getId());
        users.save(savedUser);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("id", savedUser.getId());
        resp.put("username", savedUser.getUsername());
        resp.put("email", savedUser.getEmail());
        resp.put("phone", savedUser.getPhone());
        resp.put("role", savedUser.getRole() == null ? null : savedUser.getRole().name());
        resp.put("shopId", savedShop.getId());

        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.getOrDefault("email", "").trim();
        String password = body.getOrDefault("password", "");

        User user = users.findByEmail(email).orElse(null);
        if (user == null || !encoder.matches(password, user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "invalid credentials"));
        }

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("id", user.getId());
        resp.put("username", user.getUsername());
        resp.put("email", user.getEmail());
        resp.put("phone", user.getPhone());
        resp.put("role", user.getRole() == null ? null : user.getRole().name());
        resp.put("shopId", user.getShopId());

        return ResponseEntity.ok(resp);
    }
}