# Use Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install deps
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend source
COPY . .

# Expose the backend port
EXPOSE 4000

# Start the server using npm script
CMD ["npm", "run", "start"]
