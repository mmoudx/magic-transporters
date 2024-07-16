# Magic Transporters API

Welcome to the Magic Transporters API! This API manages magic movers and magic items, allowing you to perform various operations such as adding, loading, and managing missions for magic movers.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [License](#license)

## Features
- **Magic Movers Management**: 
  - Add new magic movers.
  - Load items to magic movers, creating a database log of this activity (loading state).
  - Start a mission by updating the magic mover's state to "on-mission" and preventing further loading of items. This also creates a database log of this activity (on-mission state).
  - End a mission by unloading all items from the magic mover and creating a database log of this activity, returning the mover to a "resting" state.
  - Fetch the list of magic movers who have completed the most missions, sorted in descending order.

- **Magic Items Management**: 
  - Add new magic items with attributes such as name and weight.
  - List all magic items.

- **Validation**: 
  - Input validation for adding magic movers and items to ensure data integrity.

- **Error Handling**: 
  - Robust error handling to gracefully manage and respond to errors in the API.

- **Swagger Documentation**: 
  - API endpoints are documented using Swagger, providing an interactive interface for developers to understand and test the API.

- **e2e Jest Testing**: 
  - End-to-end testing using Jest to ensure the reliability and correctness of the API.

- **DI using tsyringe**: 
  - Dependency Injection using `tsyringe` to manage dependencies and improve code modularity and testability.

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

- Node.js (version >= 16)
- npm, pnpm or Yarn package manager
- MongoDB database

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/magic-transporters-api.git
   ```
2. **Navigate into the project directory:**
```bash
cd magic-transporters-api
```
3. **Install dependencies:**
```bash
npm install
# or
pnpm install
# or
yarn install
```
4. **Set up environment variables:**
Create a .env file in the root directory and define the following variables:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/magic_transporters_db
```
Adjust the `MONGODB_URI` according to your MongoDB setup.

5. **seed the database:**
```bash
npm seed
```

## Running the Application
### Using Node.js
```bash
npm start
```
### Using Docker
You can run the Magic Transporters API using Docker for easier setup and deployment.

#### Build the Docker image:
```bash
docker build -t magic-transporters-api .
```
#### Run the Docker container:
```bash
docker run -d -p 3000:3000 --name magic-transporters-api magic-transporters-api
```
#### Using Docker Compose:
1. Build and start the containers:
```bash
docker-compose up --build
```
This command will build the Docker image and start both the application and MongoDB containers.

2. seed the database:
```bash
docker exec -it magic-transporters-api npm run seed
```

3. Access the application:
The API will be accessible at `http://localhost:3000`.

## Testing
### Running Tests with Jest
This project uses Jest for testing, To run the tests, use the following command:

```bash
npm test
```

## Usage
- Use tools like Postman or curl to interact with the API endpoints.
- Refer to the API Documentation section for details on available endpoints and their usage.

## API Documentation
Explore the API using **Swagger** documentation (after running the server):
- Local: `http://localhost:3000/api-docs`

## License
MIT