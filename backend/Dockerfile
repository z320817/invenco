FROM node:18.12.1 as node
WORKDIR /
COPY . .
RUN npm install
EXPOSE 8500

CMD [ "npm", "run", "dev" ]