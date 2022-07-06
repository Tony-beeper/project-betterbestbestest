# stage 1 build react app
FROM node:alpine as react-build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2 serve static files
FROM nginx
# copy build files from stage 1
COPY --from=react-build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]