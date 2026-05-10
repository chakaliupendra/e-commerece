package com.shopsphere.payment.controller;

import com.shopsphere.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public String createOrder(@RequestBody Map<String, Object> data) throws Exception {
        Double amount = Double.parseDouble(data.get("amount").toString());
        return paymentService.createOrder(amount);
    }

    @PostMapping("/verify")
    public boolean verifyPayment(@RequestBody Map<String, String> data) {
        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");
        return paymentService.verifyPayment(orderId, paymentId, signature);
    }
}
