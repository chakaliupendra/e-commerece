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
    public Cart getCart(@RequestParam String email) {
        return cartService.getCart(email);
    }

    @PostMapping("/add")
    public Cart addItem(@RequestParam String email, @RequestBody CartItem item) {
        return cartService.addItemToCart(email, item);
    }

    @DeleteMapping("/remove/{productId}")
    public Cart removeItem(@RequestParam String email, @PathVariable Long productId) {
        return cartService.removeItemFromCart(email, productId);
    }

    @DeleteMapping("/clear")
    public void clearCart(@RequestParam String email) {
        cartService.clearCart(email);
    }

    @GetMapping("/summary")
    public BigDecimal getCartTotal(@RequestParam String email) {
        Cart cart = cartService.getCart(email);
        return cart.getItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
