# 1️⃣ Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

RUN npm run build

# 2️⃣ Serve stage
FROM nginx:alpine

# Replace default nginx config with simple one for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the Cloud Run port
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
