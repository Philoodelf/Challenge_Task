FROM node:20

WORKDIR /app


COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]