package com.shopsphere.order.controller;

import com.shopsphere.order.entity.Order;
import com.shopsphere.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody Order order, Principal principal) {
        // Use logged in user's email if available
        if (principal != null) {
            order.setEmail(principal.getName());
        }
        return orderService.placeOrder(order);
    }

    @GetMapping("/my-orders")
    public List<Order> getMyOrders(Principal principal) {
        if (principal == null) return null;
        return orderService.getMyOrders(principal.getName());
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}
