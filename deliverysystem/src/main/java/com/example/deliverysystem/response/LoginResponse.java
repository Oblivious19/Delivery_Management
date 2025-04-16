package com.example.deliverysystem.response;

public class LoginResponse {
    private boolean success;
    private String message;
    private String userId;
    private String userType;
    
    public LoginResponse() {
    }
    
    public LoginResponse(boolean success, String message, String userId, String userType) {
        this.success = success;
        this.message = message;
        this.userId = userId;
        this.userType = userType;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getUserType() {
        return userType;
    }
    
    public void setUserType(String userType) {
        this.userType = userType;
    }
}