package com.shopforge.backend.controllers;

import com.shopforge.backend.model.User;
import com.shopforge.backend.repo.UserRepository;
import org.springframework.web.bind.annotation.*;
import com.shopforge.backend.model.User;
import com.shopforge.backend.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import java.util.List;

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
}