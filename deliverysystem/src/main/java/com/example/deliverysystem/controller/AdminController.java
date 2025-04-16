package com.example.deliverysystem.controller;

import com.example.deliverysystem.entity.Admin;
import com.example.deliverysystem.repository.AdminRepository;
import com.example.deliverysystem.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;
    
    @Value("${admin.email}")
    private String configAdminEmail;
    
    @Value("${admin.password}")
    private String configAdminPassword;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        // Check against application.properties admin credentials
        if (email.equals(configAdminEmail) && password.equals(configAdminPassword)) {
            return ResponseEntity.ok(new LoginResponse(true, "Admin login successful", "admin", "ADMIN"));
        }
        
        // Otherwise check against database
        Optional<Admin> adminOpt = adminRepository.findByEmail(email);
        if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(password)) {
            return ResponseEntity.ok(new LoginResponse(true, "Admin login successful", "admin", "ADMIN"));
        }
        
        return ResponseEntity.ok(new LoginResponse(false, "Invalid credentials", null, null));
    }
}
