FROM node:latest as build
#ENV NODE_ENV=production
WORKDIR /app
#COPY package.json /app
COPY . .
RUN npm install
#CMD ["npm", "start"]
RUN npm run build --prod

#stage 2
FROM  nginx:alpine
COPY --from=build /app/dist/organic-client /usr/share/nginx/html
EXPOSE 8500
