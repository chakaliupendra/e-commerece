package com.shopsphere.order.service;

import com.shopsphere.order.entity.Order;
import com.shopsphere.order.entity.OrderItem;
import com.shopsphere.order.repository.OrderRepository;
import com.shopsphere.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    public Order placeOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        if (order.getStatus() == null) {
            order.setStatus("PENDING");
        }
        Order savedOrder = orderRepository.save(order);
        
        // Clear cart after order is placed
        cartService.clearCart(order.getEmail());
        
        return savedOrder;
    }

    public List<Order> getMyOrders(String email) {
        return orderRepository.findByEmail(email);
    }
    
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
}
