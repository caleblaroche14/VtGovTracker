# Use a lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the API source code
COPY . .

# Expose the port Cloud Run expects
EXPOSE 8080

# Run the API
CMD ["node", "server.js"]
