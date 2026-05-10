package com.shopsphere.cart.controller;

import com.shopsphere.cart.entity.Cart;
import com.shopsphere.cart.entity.CartItem;
import com.shopsphere.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public Cart getCart(java.security.Principal principal) {
        return cartService.getCart(principal.getName());
    }

    @PostMapping("/add")
    public Cart addItem(java.security.Principal principal, @RequestBody CartItem item) {
        return cartService.addItemToCart(principal.getName(), item);
    }

    @DeleteMapping("/remove/{productId}")
    public Cart removeItem(java.security.Principal principal, @PathVariable Long productId) {
        return cartService.removeItemFromCart(principal.getName(), productId);
    }

    @DeleteMapping("/clear")
    public void clearCart(java.security.Principal principal) {
        cartService.clearCart(principal.getName());
    }

    @GetMapping("/summary")
    public BigDecimal getCartTotal(@RequestParam String email) {
        Cart cart = cartService.getCart(email);
        return cart.getItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
