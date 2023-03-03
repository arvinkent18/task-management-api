# Set the base image
FROM node:14.17.6-alpine3.14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=prod

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]