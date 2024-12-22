FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
#COPY data-analysis ./data-analysis
EXPOSE 5000
CMD ["node", "server.js"]
