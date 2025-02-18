# Build stage
FROM node:20-alpine AS build
WORKDIR /usr/local/src/app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN ["npm", "run", "build"]

# Serve stage
FROM nginx:alpine
COPY --from=build /usr/local/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
