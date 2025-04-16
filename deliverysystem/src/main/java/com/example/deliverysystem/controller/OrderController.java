package com.example.deliverysystem.controller;

import com.example.deliverysystem.entity.Customer;
import com.example.deliverysystem.entity.DeliveryPerson;
import com.example.deliverysystem.entity.Order;
import com.example.deliverysystem.repository.CustomerRepository;
import com.example.deliverysystem.repository.DeliveryPersonRepository;
import com.example.deliverysystem.repository.OrderRepository;
import com.example.deliverysystem.response.OrderResponse;
import com.example.deliverysystem.response.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private DeliveryPersonRepository deliveryPersonRepository;
    
    @GetMapping
    public ResponseEntity<ResponseMessage> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
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
        
        return ResponseEntity.ok(new ResponseMessage(true, "Orders retrieved successfully", orderResponses));
    }
    
    @GetMapping("/available-delivery-persons")
    public ResponseEntity<ResponseMessage> getAvailableDeliveryPersons() {
        List<DeliveryPerson> availablePersons = deliveryPersonRepository.findByPersonStatus("available");
        return ResponseEntity.ok(new ResponseMessage(true, "Available delivery persons retrieved successfully", availablePersons));
    }
    
    @PostMapping
    @Transactional
    public ResponseEntity<ResponseMessage> createOrder(@RequestBody Map<String, Object> orderData) {
        try {
            Integer orderId = Integer.parseInt(orderData.get("orderId").toString());
            String customerId = (String) orderData.get("customerId");
            BigDecimal orderAmount = new BigDecimal(orderData.get("orderAmount").toString());
            String paymentMode = (String) orderData.get("paymentMode");
            String deliveryPersonId = (String) orderData.get("deliveryPersonId");
            String orderStatus = "pending";
            
            // Validate order ID
            if (orderRepository.existsByOrderId(orderId)) {
                return ResponseEntity.ok(new ResponseMessage(false, "Order ID already exists"));
            }
            
            // Validate customer
            Optional<Customer> customerOpt = customerRepository.findById(customerId);
            if (customerOpt.isEmpty()) {
                return ResponseEntity.ok(new ResponseMessage(false, "Customer not found"));
            }
            
            // Create order
            Order order = new Order();
            order.setOrderId(orderId);
            order.setCustomerId(customerId);
            order.setOrderAmount(orderAmount);
            order.setPaymentMode(paymentMode);
            
            // Set delivery person if provided and update their status
            if (deliveryPersonId != null && !deliveryPersonId.isEmpty()) {
                Optional<DeliveryPerson> deliveryPersonOpt = deliveryPersonRepository.findById(deliveryPersonId);
                if (deliveryPersonOpt.isPresent()) {
                    DeliveryPerson deliveryPerson = deliveryPersonOpt.get();
                    if ("busy".equals(deliveryPerson.getPersonStatus())) {
                        return ResponseEntity.ok(new ResponseMessage(false, "Delivery person is already busy"));
                    }
                    order.setDeliveryPersonId(deliveryPersonId);
                    order.setOrderStatus("assigned");
                    
                    // Update delivery person status
                    deliveryPerson.setPersonStatus("busy");
                    deliveryPersonRepository.save(deliveryPerson);
                } else {
                    return ResponseEntity.ok(new ResponseMessage(false, "Delivery person not found"));
                }
            } else {
                order.setOrderStatus(orderStatus);
            }
            
            Order savedOrder = orderRepository.save(order);
            
            return ResponseEntity.ok(new ResponseMessage(true, "Order created successfully", savedOrder));
            
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage(false, "Error creating order: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{orderId}")
    @Transactional
    public ResponseEntity<ResponseMessage> updateOrder(@PathVariable Integer orderId, @RequestBody Map<String, Object> orderData) {
        try {
            Optional<Order> orderOpt = orderRepository.findById(orderId);
            if (orderOpt.isEmpty()) {
                return ResponseEntity.ok(new ResponseMessage(false, "Order not found"));
            }
            
            Order order = orderOpt.get();
            
            // Update status if provided
            if (orderData.containsKey("orderStatus")) {
                String newStatus = (String) orderData.get("orderStatus");
                order.setOrderStatus(newStatus);
                
                // If status is "delivered" or "failed", free up the delivery person
                if ("delivered".equals(newStatus) || "failed".equals(newStatus)) {
                    if (order.getDeliveryPersonId() != null) {
                        Optional<DeliveryPerson> deliveryPersonOpt = deliveryPersonRepository.findById(order.getDeliveryPersonId());
                        if (deliveryPersonOpt.isPresent()) {
                            DeliveryPerson deliveryPerson = deliveryPersonOpt.get();
                            deliveryPerson.setPersonStatus("available");
                            deliveryPersonRepository.save(deliveryPerson);
                        }
                    }
                }
            }
            
            // Assign delivery person if provided
            if (orderData.containsKey("deliveryPersonId")) {
                String deliveryPersonId = (String) orderData.get("deliveryPersonId");
                
                // If current delivery person exists, set them as available
                if (order.getDeliveryPersonId() != null) {
                    Optional<DeliveryPerson> currentDeliveryPersonOpt = deliveryPersonRepository.findById(order.getDeliveryPersonId());
                    if (currentDeliveryPersonOpt.isPresent()) {
                        DeliveryPerson currentDeliveryPerson = currentDeliveryPersonOpt.get();
                        currentDeliveryPerson.setPersonStatus("available");
                        deliveryPersonRepository.save(currentDeliveryPerson);
                    }
                }
                
                // Assign new delivery person
                if (deliveryPersonId != null && !deliveryPersonId.isEmpty()) {
                    Optional<DeliveryPerson> deliveryPersonOpt = deliveryPersonRepository.findById(deliveryPersonId);
                    if (deliveryPersonOpt.isPresent()) {
                        DeliveryPerson deliveryPerson = deliveryPersonOpt.get();
                        if ("busy".equals(deliveryPerson.getPersonStatus())) {
                            return ResponseEntity.ok(new ResponseMessage(false, "Delivery person is already busy"));
                        }
                        order.setDeliveryPersonId(deliveryPersonId);
                        order.setOrderStatus("assigned");
                        
                        // Update delivery person status
                        deliveryPerson.setPersonStatus("busy");
                        deliveryPersonRepository.save(deliveryPerson);
                    } else {
                        return ResponseEntity.ok(new ResponseMessage(false, "Delivery person not found"));
                    }
                } else {
                    order.setDeliveryPersonId(null);
                }
            }
            
            Order updatedOrder = orderRepository.save(order);
            return ResponseEntity.ok(new ResponseMessage(true, "Order updated successfully", updatedOrder));
            
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage(false, "Error updating order: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{orderId}")
    public ResponseEntity<ResponseMessage> deleteOrder(@PathVariable Integer orderId) {
        try {
            Optional<Order> orderOpt = orderRepository.findById(orderId);
            if (orderOpt.isEmpty()) {
                return ResponseEntity.ok(new ResponseMessage(false, "Order not found"));
            }
            
            Order order = orderOpt.get();
            
            // Free up delivery person if assigned
            if (order.getDeliveryPersonId() != null) {
                Optional<DeliveryPerson> deliveryPersonOpt = deliveryPersonRepository.findById(order.getDeliveryPersonId());
                if (deliveryPersonOpt.isPresent()) {
                    DeliveryPerson deliveryPerson = deliveryPersonOpt.get();
                    deliveryPerson.setPersonStatus("available");
                    deliveryPersonRepository.save(deliveryPerson);
                }
            }
            
            orderRepository.delete(order);
            return ResponseEntity.ok(new ResponseMessage(true, "Order deleted successfully"));
            
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage(false, "Error deleting order: " + e.getMessage()));
        }
    }
    
    @PostMapping("/{orderId}/delivery-status")
    @Transactional
    public ResponseEntity<ResponseMessage> updateDeliveryStatus(@PathVariable Integer orderId, @RequestBody Map<String, Object> statusData) {
        try {
            Boolean delivered = (Boolean) statusData.get("delivered");
            
            Optional<Order> orderOpt = orderRepository.findById(orderId);
            if (orderOpt.isEmpty()) {
                return ResponseEntity.ok(new ResponseMessage(false, "Order not found"));
            }
            
            Order order = orderOpt.get();
            
            // Update order status based on customer confirmation
            if (delivered) {
                order.setOrderStatus("delivered");
            } else {
                order.setOrderStatus("failed");
            }
            
            // Free up delivery person
            if (order.getDeliveryPersonId() != null) {
                Optional<DeliveryPerson> deliveryPersonOpt = deliveryPersonRepository.findById(order.getDeliveryPersonId());
                if (deliveryPersonOpt.isPresent()) {
                    DeliveryPerson deliveryPerson = deliveryPersonOpt.get();
                    deliveryPerson.setPersonStatus("available");
                    deliveryPersonRepository.save(deliveryPerson);
                }
            }
            
            orderRepository.save(order);
            return ResponseEntity.ok(new ResponseMessage(true, "Delivery status updated successfully", order));
            
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage(false, "Error updating delivery status: " + e.getMessage()));
        }
    }
}