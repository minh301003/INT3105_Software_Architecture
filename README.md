# Monitoring and API Infrastructure

This project sets up a monitoring and API infrastructure using Docker Compose. It includes APIs for currency and gold data, alongside monitoring tools like cAdvisor, Prometheus, Grafana, and Alertmanager.

---

## Table of Contents

1. [Overview](#overview)
2. [Services](#services)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

---

## Overview

This Docker Compose setup provides:
- **APIs**: Gold and Currency APIs for handling respective data.
- **Monitoring Tools**: Includes Prometheus, cAdvisor, Node Exporter, Grafana, and Alertmanager for a complete monitoring solution.

### Architecture

The architecture is designed to:
- Provide data via APIs.
- Collect metrics from running containers and system nodes.
- Display metrics and graphs using Grafana.
- Send alerts for predefined thresholds.
---

## Services

### 1. Gold API (`gold-api`)
- **Description**: Provides gold-related data.
- **Ports**: `6001` (mapped to internal port `3002`).

### 2. Currency API (`currency-api`)
- **Description**: Provides currency-related data.
- **Ports**: `6002` (mapped to internal port `3002`).

### 3. cAdvisor
- **Description**: Collects container metrics.
- **Ports**: `8080`.

### 4. Prometheus
- **Description**: Metrics database and monitoring engine.
- **Ports**: `9090`.

### 5. Alertmanager
- **Description**: Manages alerts from Prometheus.
- **Ports**: `9093`.

### 6. Node Exporter
- **Description**: Collects hardware and OS metrics.
- **Ports**: `9100`.

### 7. Grafana
- **Description**: Visualizes data and metrics from Prometheus.
- **Ports**: `3000`.
---

## Prerequisites

- **Docker**: Ensure Docker is installed. [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Ensure Docker Compose is installed. [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/minh301003/INT3105_Software_Architecture.git
   cd backend
2. Start the Docker Compose stack:
    ```bash
   docker-compose up --build
3. Access the services:

- **Gold API**: http://localhost:6001
- **Currency API**: http://localhost:6002
- **cAdvisor**: http://localhost:8080
- **Prometheus**: http://localhost:9090
- **Alertmanager**: http://localhost:9093
- **Grafana**: http://localhost:3000


---

### Part 4: Usage and Contribution

## Usage

### Grafana Configuration
1. Login to Grafana:
   - Default username: `admin`
   - Default password: `admin` (or as configured in the provisioning file).
2. Add Prometheus as a data source.
3. Import dashboards or create custom dashboards for your monitoring needs.

### Customizing APIs
Modify `index.js` for API behavior changes:
- Located at: `./index.js`
- Volume-mapped to the containers.

### Prometheus Alerts
Update `alertmanager.yml` and `prometheus.yml` as needed:
- Alertmanager config: `./alertmanager/alertmanager.yml`.
- Prometheus config: `./prometheus/prometheus.yml`.

---

## Contributing

### Group Members
- **Leader**: Chung Hoàng Minh
- Lê Văn Khoa
- Đinh Trung Kiên
---

## License

This project is licensed under the [MIT License](./LICENSE).

---
