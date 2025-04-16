package com.example.deliverysystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
public class DeliverySystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(DeliverySystemApplication.class, args);
    }
}
