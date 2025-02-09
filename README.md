# Coffee Logger

## Summary

Coffee Logger is an embedded C/C++ microcontroller project that integrates with AWS for real-time data storage and retrieval using a Next.js dashboard. The system detects coffee brewing events using an Arduino ESP32 and a contactless water level sensor. Data is sent to an AWS API Gateway, processed via a Lambda function, and stored in DynamoDB. The Next.js-based React dashboard then retrieves and displays insightful coffee metrics.

![Coffee Logger Diagram](/public/coffee-logger-architecture.svg)

---

## System Overview

### Data Collection and Transmission

An **Arduino ESP32** is connected to a **contactless water level sensor**, attached to the back of a coffee machine. When brewing starts, the water level in the coffee pot drops, triggering the sensor to send a **5V signal** to the Arduino.

- The Arduino detects this voltage change and executes a function that posts a brew event to AWS.
- It constructs and sends an **HTTP POST request** with an API key to an **AWS API Gateway endpoint**.

### Data Processing and Storage

When the Arduino's request reaches the API Gateway:

1. The API Gateway triggers an **AWS Lambda function** to process the incoming data.
2. The Lambda function assumes an **IAM role** with least privileges, allowing it to store data in **DynamoDB**.
3. The processed data is inserted into the DynamoDB table.

### Data Retrieval and Display

When a user accesses the website to view coffee metrics, they interact with a **Next.js React application**. On page load:

1. The client sends a request to a server-side API route in Next.js.
2. The server, which holds necessary credentials, makes an **HTTP GET request** to another AWS API Gateway.
3. The API Gateway triggers a **Lambda function** to assume the required IAM role and scan the database.
4. The retrieved coffee data is returned to the frontend and displayed in the application.

---

## Key Features

### **Rate Limiting**

- Both API Gateways implement rate and burst limits to prevent excessive costs or disruptions due to misconfigurations or malicious activity.

### **CloudWatch Monitoring**

- AWS CloudWatch logs interactions and reports anomalies for system monitoring and debugging.

### **Zero Trust & Least Privilege**

- Uses **IAM roles**, not user credentials, for temporary permissions.
- Each role is restricted to specific resources and allowed actions.
- If compromised, exposure is limited to the role's specific permissions.

---

## Areas for Improvement

### **Handling Missed Coffee Events**

- Store missed coffee events in **EEPROM** on the Arduino in case of WiFi or AWS connection failures.
- Currently, any connection issue results in lost data points.

### **Database Optimization**

- Improve record storage and response format to reduce frontend data processing.
- Enhance query efficiency for faster data retrieval and display.

---

This project demonstrates a robust integration between embedded hardware and cloud computing, ensuring reliable and secure real-time coffee monitoring. Future improvements will enhance resilience and performance.
