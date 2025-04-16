package com.example.deliverysystem.repository;

import com.example.deliverysystem.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByCustomerId(String customerId);
    boolean existsByOrderId(Integer orderId);
}