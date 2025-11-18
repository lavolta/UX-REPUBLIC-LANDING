# Multi-stage build for UX-REPUBLIC-LANDING

# Stage 1: Build stage
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Set npm config for better reliability
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_FUND=false
ENV NPM_CONFIG_AUDIT=false
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

# Copy package files
COPY package*.json ./

# Install dependencies in production mode for faster installation
RUN npm install --legacy-peer-deps --omit=dev --no-optional && \
    npm install --legacy-peer-deps --only=dev --no-optional

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage with nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
