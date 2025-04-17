# Delivery Management System

A modern delivery management application built with Angular and Spring Boot. This system helps businesses manage their orders, delivery personnel, and customers with an intuitive interface.

## Features

- **Admin Dashboard**: Manage orders, delivery personnel, and customers
- **Customer Portal**: Place orders, track deliveries, and view order history
- **Delivery Tracking**: Real-time tracking of order status and delivery personnel
- **Mock Data Mode**: Run with or without a backend server using comprehensive mock data

## Project Structure

This project is divided into two main components:

1. **Frontend**: Angular-based web application (`/frontend`)
2. **Backend**: Spring Boot REST API (`/deliverysystem`)

## Prerequisites

- Node.js (v14+) and npm
- Java 11+
- Maven
- Git

## Getting Started

### Cloning the Repository

```bash
git clone https://github.com/Oblivious19/Delivery_Management.git
cd Delivery_Management
```

### Running the Frontend (Angular)

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`

**Note**: The frontend is configured to run with mock data by default, so no backend connection is required to test the application.

### Running the Backend (Spring Boot)

Navigate to the backend directory:

```bash
cd deliverysystem
```

Build and run the application:

```bash
./mvnw spring-boot:run
```

The REST API will be available at `http://localhost:8080/api`

## Using the Application

### Default Credentials

#### Admin Login

- Email: admin@example.com
- Password: admin123

#### Customer Login

- Email: john.doe@example.com
- Password: customer123

### Switching Between Mock and Real Data

The application is configured to use mock data by default, which allows you to test all features without a working backend. To switch between mock and real data:

1. Open `frontend/src/app/services/api-provider.service.ts`
2. Change the `useMockData` flag (true = mock data, false = real backend)

## Features Overview

### Admin Dashboard

- View order statistics
- Manage orders (create, assign delivery personnel, update status)
- Manage delivery personnel (add, update status, track)
- View customer information

### Customer Dashboard

- Place new orders
- Track current orders
- View order history
- Update profile information

## Development Notes

### Mock Data

The application includes comprehensive mock data for testing purposes:

- 10+ sample orders with different statuses
- 7+ delivery personnel with various stats
- 8+ customers with full profiles

### API Documentation

The backend API documentation is available at `http://localhost:8080/swagger-ui.html` when running the backend server.

## Troubleshooting

### Frontend Issues

If you encounter issues with the frontend:

1. Make sure all dependencies are installed: `npm install`
2. Clear cache: `npm cache clean --force`
3. Check if you're using compatible Node.js version

### Backend Issues

If you encounter issues with the backend:

1. Ensure Java 11+ is installed: `java -version`
2. Check database configuration in `application.properties`
3. Make sure required ports (8080) are available

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
