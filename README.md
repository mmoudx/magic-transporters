# Magic Transporters API

Welcome to the Magic Transporters API! This API manages magic movers and magic items, allowing you to perform various operations such as adding, loading, and managing missions for magic movers.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Magic Movers Management**: Add, load items, start, and end missions for magic movers.
- **Magic Items Management**: Add and list magic items with name and weight.
- **Validation**: Input validation for adding magic movers and items.
- **Swagger Documentation**: API endpoints are documented using Swagger for easy reference.

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

5. **Start the server:**
```bash
npm start
# or
pnpm start
# or
yarn start
```
## Docker
You can run the Magic Transporters API using Docker for easier setup and deployment.

### Build the Docker image:
```bash
docker build -t magic-transporters-api .
```
### Run the Docker container:
```bash
docker run -d -p 3000:3000 --name magic-transporters-api magic-transporters-api
```
### Using Docker Compose:
1. Build and start the containers:
```bash
docker-compose up --build
```
This command will build the Docker image and start both the application and MongoDB containers.

2. Stop the containers:
```bash
docker-compose down
```
The API will be accessible at `http://localhost:3000`.
## Usage
- Use tools like Postman or curl to interact with the API endpoints.
- Refer to the API Documentation section for details on available endpoints and their usage.

## API Documentation
Explore the API using Swagger documentation:
- Local: `http://localhost:3000/api-docs`

## License
MIT