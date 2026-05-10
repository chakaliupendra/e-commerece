package com.shopsphere.user.controller;

import com.shopsphere.user.entity.User;
import com.shopsphere.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public User getProfile(@RequestParam String email) {
        return userService.getUserProfile(email);
    }

    @PutMapping("/profile")
    public User updateProfile(@RequestBody User user) {
        return userService.updateUserProfile(user);
    }
}
