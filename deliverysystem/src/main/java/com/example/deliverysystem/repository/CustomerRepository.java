package com.example.deliverysystem.repository;

import com.example.deliverysystem.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Optional<Customer> findByCustomerEmail(String email);
    boolean existsByCustomerEmail(String email);
}