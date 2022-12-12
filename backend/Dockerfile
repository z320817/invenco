FROM node:18.12.1 as node
WORKDIR /
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8500

CMD [ "npm", "run", "start:prod" ]

RUN sleep 30 && npm run test:ci