package com.example.deliverysystem.response;

import java.math.BigDecimal;

public class OrderResponse {
    private Integer orderId;
    private String customerId;
    private String customerName;
    private String orderStatus;
    private BigDecimal orderAmount;
    private String paymentMode;
    private String deliveryPersonId;
    private String deliveryPersonContact;
    private String deliveryPersonStatus;
    
    public OrderResponse() {
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
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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
    
    public String getDeliveryPersonContact() {
        return deliveryPersonContact;
    }
    
    public void setDeliveryPersonContact(String deliveryPersonContact) {
        this.deliveryPersonContact = deliveryPersonContact;
    }
    
    public String getDeliveryPersonStatus() {
        return deliveryPersonStatus;
    }
    
    public void setDeliveryPersonStatus(String deliveryPersonStatus) {
        this.deliveryPersonStatus = deliveryPersonStatus;
    }
}
