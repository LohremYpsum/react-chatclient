# Use an official Node.js runtime as the base image (adjust the base-version to your liking)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install


COPY . .

# Expose the port your app will run on (React development server usually runs on 3000)
EXPOSE 3000

# Start your React app when the container starts
CMD ["npm", "start"]