FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use an official Nginx image to serve the React app
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=0 /app/build .

# Expose port 80 for the container
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
#CMD ["npm", "start"]
