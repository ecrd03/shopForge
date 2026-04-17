package com.shopforge.backend.controllers;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.shopforge.backend.model.Role;
import com.shopforge.backend.model.Shop;
import com.shopforge.backend.model.User;
import com.shopforge.backend.repo.ShopRepository;
import com.shopforge.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository users;
    private final ShopRepository shops;
    private final PasswordEncoder encoder;

    @Value("${google.client.id}")
    private String googleClientId;

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

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        String credential = body.getOrDefault("credential", "").trim();

        System.out.println(">>> /api/auth/google called");
        System.out.println(">>> credential present: " + !credential.isEmpty());

        if (credential.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "missing google credential"));
        }

        try {
            GoogleIdToken.Payload payload = verifyGoogleToken(credential);

            if (payload == null) {
                System.out.println(">>> Google payload is null");
                return ResponseEntity.status(401).body(Map.of("error", "invalid google token"));
            }

            String email = payload.getEmail();
            Object emailVerifiedValue = payload.get("email_verified");

            boolean emailVerified =
                    Boolean.TRUE.equals(emailVerifiedValue) ||
                            "true".equalsIgnoreCase(String.valueOf(emailVerifiedValue));

            System.out.println(">>> Google email: " + email);
            System.out.println(">>> email_verified raw: " + emailVerifiedValue);
            System.out.println(">>> email_verified parsed: " + emailVerified);

            if (email == null || email.isBlank() || !emailVerified) {
                return ResponseEntity.status(401).body(Map.of("error", "google email not verified"));
            }

            User user = users.findByEmail(email).orElse(null);

            System.out.println(">>> existing user found: " + (user != null));

            if (user == null) {
                String name = (String) payload.get("name");
                String username = generateUniqueUsername(email, name);

                User newUser = new User();
                newUser.setUsername(username);
                newUser.setEmail(email);
                newUser.setPhone("");
                newUser.setPasswordHash(encoder.encode("GOOGLE_AUTH_NO_PASSWORD"));
                newUser.setRole(Role.SHOP_OWNER);
                newUser.setActive(true);

                User savedUser = users.save(newUser);

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
                user = users.save(savedUser);

                System.out.println(">>> created new google user with id: " + user.getId());
            }

            Map<String, Object> resp = new LinkedHashMap<>();
            resp.put("id", user.getId());
            resp.put("username", user.getUsername());
            resp.put("email", user.getEmail());
            resp.put("phone", user.getPhone());
            resp.put("role", user.getRole() == null ? null : user.getRole().name());
            resp.put("shopId", user.getShopId());

            System.out.println(">>> google login success for: " + user.getEmail());

            return ResponseEntity.ok(resp);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "google verification failed: " + e.getMessage()));
        }
    }

    private GoogleIdToken.Payload verifyGoogleToken(String credential)
            throws GeneralSecurityException, IOException {

        System.out.println(">>> expected google client id: " + googleClientId);

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance()
        )
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = verifier.verify(credential);

        if (idToken == null) {
            System.out.println(">>> idToken is null");
            return null;
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        String issuer = payload.getIssuer();

        System.out.println(">>> issuer: " + issuer);
        System.out.println(">>> payload email: " + payload.getEmail());

        if (!"accounts.google.com".equals(issuer) &&
                !"https://accounts.google.com".equals(issuer)) {
            System.out.println(">>> invalid issuer");
            return null;
        }

        return payload;
    }

    private String generateUniqueUsername(String email, String name) {
        String base = "";

        if (name != null && !name.isBlank()) {
            base = name.toLowerCase().replaceAll("[^a-z0-9]", "");
        }

        if (base.isBlank() && email != null && email.contains("@")) {
            base = email.substring(0, email.indexOf("@"))
                    .toLowerCase()
                    .replaceAll("[^a-z0-9]", "");
        }

        if (base.isBlank()) {
            base = "shopuser";
        }

        String username = base;
        int counter = 1;

        while (users.findByUsername(username).isPresent()) {
            username = base + counter;
            counter++;
        }

        return username;
    }
}