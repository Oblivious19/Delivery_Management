package com.example.deliverysystem.controller;

import com.example.deliverysystem.entity.Customer;
import com.example.deliverysystem.entity.Order;
import com.example.deliverysystem.repository.CustomerRepository;
import com.example.deliverysystem.repository.OrderRepository;
import com.example.deliverysystem.response.LoginResponse;
import com.example.deliverysystem.response.OrderResponse;
import com.example.deliverysystem.response.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerRepository.findAll());
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        Optional<Customer> customerOpt = customerRepository.findByCustomerEmail(email);
        if (customerOpt.isPresent() && customerOpt.get().getCustomerPassword().equals(password)) {
            Customer customer = customerOpt.get();
            return ResponseEntity.ok(new LoginResponse(true, "Login successful", customer.getCustomerId(), "CUSTOMER"));
        }
        
        return ResponseEntity.ok(new LoginResponse(false, "Invalid credentials", null, null));
    }
    
    @GetMapping("/{customerId}/orders")
    public ResponseEntity<ResponseMessage> getCustomerOrders(@PathVariable String customerId) {
        Optional<Customer> customerOpt = customerRepository.findById(customerId);
        if (customerOpt.isEmpty()) {
            return ResponseEntity.ok(new ResponseMessage(false, "Customer not found"));
        }
        
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        List<OrderResponse> orderResponses = orders.stream().map(order -> {
            OrderResponse response = new OrderResponse();
            response.setOrderId(order.getOrderId());
            response.setCustomerId(order.getCustomerId());
            response.setCustomerName(order.getCustomer() != null ? order.getCustomer().getCustomerName() : null);
            response.setOrderStatus(order.getOrderStatus());
            response.setOrderAmount(order.getOrderAmount());
            response.setPaymentMode(order.getPaymentMode());
            response.setDeliveryPersonId(order.getDeliveryPersonId());
            if (order.getDeliveryPerson() != null) {
                response.setDeliveryPersonContact(order.getDeliveryPerson().getPersonContactNumber());
                response.setDeliveryPersonStatus(order.getDeliveryPerson().getPersonStatus());
            }
            return response;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(new ResponseMessage(true, "Customer orders retrieved successfully", orderResponses));
    }
}