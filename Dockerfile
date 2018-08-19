FROM node:8-slim
WORKDIR /app
COPY package.json package.json
RUN npm install http-server
COPY dist dist
CMD npm start
