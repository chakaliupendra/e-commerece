package com.shopsphere.user.service;

import com.shopsphere.user.entity.User;
import com.shopsphere.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserProfile(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUserProfile(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setName(user.getName());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setAddresses(user.getAddresses());
        return userRepository.save(existingUser);
    }
}
