package com.shopsphere.cart.service;

import com.shopsphere.cart.entity.Cart;
import com.shopsphere.cart.entity.CartItem;
import com.shopsphere.cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public Cart getCart(String email) {
        return cartRepository.findByUserEmail(email).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserEmail(email);
            return cartRepository.save(newCart);
        });
    }

    public Cart addItemToCart(String email, CartItem item) {
        Cart cart = getCart(email);
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + item.getQuantity());
        } else {
            cart.getItems().add(item);
        }
        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(String email, Long productId) {
        Cart cart = getCart(email);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    public void clearCart(String email) {
        Cart cart = getCart(email);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
