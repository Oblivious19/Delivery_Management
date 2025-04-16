package com.example.deliverysystem.repository;

import com.example.deliverysystem.entity.DeliveryPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryPersonRepository extends JpaRepository<DeliveryPerson, String> {
    List<DeliveryPerson> findByPersonStatus(String status);
}