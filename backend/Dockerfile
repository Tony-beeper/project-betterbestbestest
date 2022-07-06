FROM node:alpine

WORKDIR /usr/src/app
# copy package*.json to container
COPY package*.json ./
# install dependancies
RUN npm install
# copy our source code to container
COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]