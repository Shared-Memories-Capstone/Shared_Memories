# ─────────────────────────────────────────────────────────────────
# Frontend - Multi-Stage Build
# ─────────────────────────────────────────────────────────────────

# Build Stage: Use Node.js to install dependencies and build the frontend
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/local/src/app

# Copy package.json and package-lock.json to leverage Docker's build cache for dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Define a build-time environment variable for the API URL
ARG VITE_API_URL

# Set a default API URL if none is provided. Environment variables prefixed with `VITE_`
# are automatically exposed to the frontend during the build.
ENV VITE_API_URL=${VITE_API_URL:-http://localhost:8000/api}

# Run the frontend build process, generating static assets in the 'dist' directory
RUN ["npm", "run", "build"]

# ─────────────────────────────────────────────────────────────────
# Serve Stage: Use Nginx to serve the built frontend files
# ─────────────────────────────────────────────────────────────────

FROM nginx:alpine AS serve

# Copy the built frontend files from the build stage to the Nginx web root directory
COPY --from=build /usr/local/src/app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to serve the frontend
EXPOSE 80

# Health check to verify that Nginx is running and serving content
HEALTHCHECK --interval=60s --start-interval=5s --start-period=10s \
    --timeout=10s --retries=3 \
    CMD wget --spider -q http://127.0.0.1 || exit 1

# Run Nginx in the foreground (keeps the container running)
CMD ["nginx", "-g", "daemon off;"]
