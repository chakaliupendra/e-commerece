package com.shopsphere.auth.controller;

import com.shopsphere.auth.dto.AuthRequest;
import com.shopsphere.auth.entity.UserCredential;
import com.shopsphere.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String addNewUser(@RequestBody UserCredential user) {
        System.out.println("Registering user: " + user.getEmail());
        return service.saveUser(user);
    }

    @Autowired
    private com.shopsphere.auth.repository.UserCredentialRepository userRepository;

    @PostMapping("/login")
    public java.util.Map<String, Object> getToken(@RequestBody AuthRequest authRequest) {
        System.out.println("Login attempt for: " + authRequest.getEmail());
        Authentication authenticate = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );
        if (authenticate.isAuthenticated()) {
            String token = service.generateToken(authRequest.getEmail());
            UserCredential user = userRepository.findByEmail(authRequest.getEmail()).orElse(null);
            
            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("token", token);
            response.put("user", user);
            return response;
        } else {
            throw new RuntimeException("invalid access");
        }
    }
}
