FROM node:8-slim
WORKDIR /app
COPY package.json package.json
RUN npm install http-server
COPY dist dist
COPY cert.pem dist/cert.pem
COPY key.pem dist/key.pem
CMD npm start
