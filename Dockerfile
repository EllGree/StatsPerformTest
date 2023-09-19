# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Define an environment variable for the port (default to 3000)
ENV PORT=3000

# Expose the port your app will run on
EXPOSE $PORT

# Start the Node.js application using the environment variable
CMD [ "node", "app.js" ]
