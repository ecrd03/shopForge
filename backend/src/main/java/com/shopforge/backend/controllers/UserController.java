package com.shopforge.backend.controllers;

import com.shopforge.backend.model.User;
import com.shopforge.backend.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository users;
    private final PasswordEncoder encoder;

    public UserController(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    @GetMapping
    public List<UserSummary> getAllUsers() {
        return users.findAll().stream()
                .map(user -> new UserSummary(
                        user.getId(),
                        user.getEmail(),
                        user.getUsername(),
                        user.getPhone(),
                        user.getShopId(),
                        user.getRole() == null ? null : user.getRole().name(),
                        user.isActive()
                ))
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Map<String, String> body) {
        User user = users.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "user not found"));
        }

        String email = body.getOrDefault("email", "").trim();
        String username = body.getOrDefault("username", "").trim();
        String phone = body.getOrDefault("phone", "").trim();

        if (email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "email is required"));
        }

        if (username.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "username is required"));
        }

        User existingEmailUser = users.findByEmail(email).orElse(null);
        if (existingEmailUser != null && !existingEmailUser.getId().equals(id)) {
            return ResponseEntity.badRequest().body(Map.of("error", "email is already in use"));
        }

        User existingUsernameUser = users.findByUsername(username).orElse(null);
        if (existingUsernameUser != null && !existingUsernameUser.getId().equals(id)) {
            return ResponseEntity.badRequest().body(Map.of("error", "username is already in use"));
        }

        user.setEmail(email);
        user.setUsername(username);
        user.setPhone(phone.isEmpty() ? null : phone);

        users.save(user);

        return ResponseEntity.ok(new UserSummary(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getPhone(),
                user.getShopId(),
                user.getRole() == null ? null : user.getRole().name(),
                user.isActive()
        ));
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newPassword = body.getOrDefault("password", "").trim();

        if (newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "password is required"));
        }

        User user = users.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "user not found"));
        }

        user.setPasswordHash(encoder.encode(newPassword));
        users.save(user);

        return ResponseEntity.ok(Map.of("message", "password updated"));
    }

    public record UserSummary(
            Long id,
            String email,
            String username,
            String phone,
            Long shopId,
            String role,
            boolean active
    ) {}
}