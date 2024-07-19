# Flight Ticket Reservation System

This is a fullstack application for listing and purchasing flights. The frontend is built with React and Vite, and the backend is developed using Spring Boot. The project uses Couchbase as the database.

## Project Structure

- `client`: Contains the React source code for the frontend.
- `api`: Contains the Spring Boot source code for the backend.

## Features

- List available flights.
- View details of each flight.
- Like and purchase flights.
- Filter flights based on criteria.
- User registration and login.
- Admin functionalities for adding, deleting, and updating flights.

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Spring Boot
- **Database**: Couchbase

## Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- Java (JDK 8 or higher)
- Maven
- Couchbase Server

## Installation and Setup

Follow these steps to set up and run the project locally.

### Frontend

1. Navigate to the `client` directory:
  ```sh
     cd client
  ```
2. Install the dependencies:
  ```sh
     npm install
  ```
3. Start the Vite development server:
  ```sh
     npm run dev
  ```
The React application should now be running on http://localhost:5173.

### Backend
1. Navigate to the api directory:
  ```sh
     cd api
  ```

2. Update the Couchbase configuration in src/main/resources/application.properties:
```properties
  spring.couchbase.connection-string=YOUR_COUCHBASE_CONNECTION_STRING
  spring.couchbase.bucket-name=YOUR_BUCKET_NAME
  spring.couchbase.username=YOUR_USERNAME
  spring.couchbase.password=YOUR_PASSWORD
```
3. Build the Spring Boot application using Maven:
  ```sh
     mvn clean install
  ```
4. Run the Spring Boot application:
  ```sh
     mvn spring-boot:run
  ```
The Spring Boot application should now be running on http://localhost:8080.

## Usage
1. Open your browser and navigate to http://localhost:3000 to access the frontend.
2. Use the frontend interface to browse, like, and purchase flights.

## User Features
- Search Flights: Use the form to search for flights by selecting the departure location, arrival location, and departure date. Optionally, you can also select the airline.
- Filter Flights: Filter the listed flights by maximum price, flight duration, and flight type (Direct, Connecting, or Both).
- Purchase Flights: To purchase a flight, you must be logged in. If you don't have an account, you can register.

#### Admin Features
- Manage Flights: Admin users can add, delete, and update flights. After logging in with admin credentials, access the admin panel to manage flights.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or feedback, please contact [bnkalkan41@gmail.com].
