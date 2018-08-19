FROM node:8-slim
WORKDIR /app
RUN npm install http-server
COPY package.json package.json
COPY dist dist
CMD npm start