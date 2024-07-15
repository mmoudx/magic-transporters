# Use Node.js 14 LTS as base image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install 

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
