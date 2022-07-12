FROM node:lts-alpine
WORKDIR /home/app
COPY package*.json ./
RUN npm install pm2 -g
RUN npm ci --omit=dev
COPY ./build .
EXPOSE 4101
CMD ["pm2-runtime","app.js"]
