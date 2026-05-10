# ShopSphere – E-Commerce Backend System

ShopSphere is a production-level, enterprise-grade e-commerce microservices backend application built with **Java 17**, **Spring Boot**, and **PostgreSQL**.

## 🚀 Tech Stack

* **Java 17**
* **Spring Boot 3.2.5**
* **Spring Cloud 2023.0.1** (Config, Discovery, Gateway, OpenFeign)
* **Spring Security** (JWT Authentication & RBAC)
* **PostgreSQL** (Multiple isolated databases)
* **Docker & Docker Compose**
* **GitHub Actions** (CI/CD)
* **Swagger/OpenAPI 3.0**
* **Lombok & Validation API**

## 🏗️ Architecture

The system has been restructured into a **Monolithic Architecture** for simpler deployment and development, unifying the previous microservices into a single cohesive application.

Modules:
1.  **Auth Module**: Manages user credentials, registration, login, and JWT token generation.
2.  **User Module**: Handles user profiles and address management.
3.  **Product Module**: Manages the product catalog, categories, and inventory.
4.  **Cart Module**: Handles shopping cart persistence and logic.
5.  **Order Module**: Manages order placement, history, and status tracking.
6.  **Payment Module**: Mock payment gateway for transaction processing.
7.  **Notification Module**: Simulated notification service for email/SMS alerts.
8.  **Admin Module**: Aggregates stats and provides management dashboard APIs.

## 🛠️ Getting Started

### Prerequisites
* Docker & Docker Compose
* JDK 17
* Maven 3.x

### Build the Project
Since you have Docker installed, you don't need Maven locally. Use the provided build script:
```powershell
./build.ps1
```
This will run the Maven build inside a temporary Docker container.

### Start the environment
Once the build is complete, start the infrastructure and services:
```bash
docker-compose up --build
```

## 🔐 Security

The application uses **JWT (JSON Web Token)** for stateless authentication.
* Registration and Login are open endpoints.
* All other business endpoints are secured via the global Spring Security JWT filter.
* Role-Based Access Control (RBAC) is implemented within the modules.

## 📖 API Documentation

The monolith exposes a unified Swagger documentation interface. Once running, you can access the API documentation at:
* `http://localhost:8080/swagger-ui.html`

## 📁 Project Structure

```text
shopsphere/
├── src/main/java/com/shopsphere/
│   ├── auth/            # JWT & RBAC
│   ├── user/            # Profile Management
│   ├── product/         # Catalog & Inventory
│   ├── cart/            # Shopping Cart
│   ├── order/           # Order Processing
│   ├── payment/         # Mock Payment
│   ├── notification/    # Simulated Notifications
│   └── admin/           # Dashboard APIs
├── Dockerfile           # Docker configuration for Monolith
└── docker-compose.yml   # Docker orchestration for Monolith + PostgreSQL
```

## ✅ SOLID Principles & Clean Code
The project follows clean code practices:
* **S**ingle Responsibility Principle: Each service and class has one job.
* **O**pen/Closed Principle: Entities and logic are extensible.
* **L**iskov Substitution Principle: Proper use of interfaces and inheritance.
* **I**nterface Segregation Principle: Modular Feign clients.
* **D**ependency Inversion Principle: Extensive use of Spring Dependency Injection.
