package com.example.deliverysystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "delivery_persons")
public class DeliveryPerson {
    
    @Id
    @Column(name = "person_id")
    private String personId;
    
    @Column(name = "person_contact_number", nullable = false)
    private String personContactNumber;
    
    @Column(name = "person_status", nullable = false)
    private String personStatus = "available";
    
    // Constructors
    public DeliveryPerson() {
    }
    
    public DeliveryPerson(String personId, String personContactNumber, String personStatus) {
        this.personId = personId;
        this.personContactNumber = personContactNumber;
        this.personStatus = personStatus;
    }
    
    // Getters and Setters
    public String getPersonId() {
        return personId;
    }
    
    public void setPersonId(String personId) {
        this.personId = personId;
    }
    
    public String getPersonContactNumber() {
        return personContactNumber;
    }
    
    public void setPersonContactNumber(String personContactNumber) {
        this.personContactNumber = personContactNumber;
    }
    
    public String getPersonStatus() {
        return personStatus;
    }
    
    public void setPersonStatus(String personStatus) {
        this.personStatus = personStatus;
    }
}