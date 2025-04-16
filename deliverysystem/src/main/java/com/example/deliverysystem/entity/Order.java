package com.example.deliverysystem.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    @Column(name = "order_id")
    private Integer orderId;
    
    @Column(name = "customer_id", nullable = false)
    private String customerId;
    
    @Column(name = "order_status", nullable = false)
    private String orderStatus = "pending";
    
    @Column(name = "order_amount", nullable = false)
    private BigDecimal orderAmount;
    
    @Column(name = "payment_mode", nullable = false)
    private String paymentMode;
    
    @Column(name = "delivery_person_id")
    private String deliveryPersonId;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private Customer customer;
    
    @ManyToOne
    @JoinColumn(name = "delivery_person_id", insertable = false, updatable = false)
    private DeliveryPerson deliveryPerson;
    
    // Constructors
    public Order() {
    }
    
    public Order(Integer orderId, String customerId, String orderStatus, BigDecimal orderAmount, String paymentMode, String deliveryPersonId) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.orderStatus = orderStatus;
        this.orderAmount = orderAmount;
        this.paymentMode = paymentMode;
        this.deliveryPersonId = deliveryPersonId;
    }
    
    // Getters and Setters
    public Integer getOrderId() {
        return orderId;
    }
    
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
    
    public String getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
    
    public String getOrderStatus() {
        return orderStatus;
    }
    
    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
    
    public BigDecimal getOrderAmount() {
        return orderAmount;
    }
    
    public void setOrderAmount(BigDecimal orderAmount) {
        this.orderAmount = orderAmount;
    }
    
    public String getPaymentMode() {
        return paymentMode;
    }
    
    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }
    
    public String getDeliveryPersonId() {
        return deliveryPersonId;
    }
    
    public void setDeliveryPersonId(String deliveryPersonId) {
        this.deliveryPersonId = deliveryPersonId;
    }
    
    public Customer getCustomer() {
        return customer;
    }
    
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    
    public DeliveryPerson getDeliveryPerson() {
        return deliveryPerson;
    }
    
    public void setDeliveryPerson(DeliveryPerson deliveryPerson) {
        this.deliveryPerson = deliveryPerson;
    }
}