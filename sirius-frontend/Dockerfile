
FROM node:18-alpine

WORKDIR /sirius-frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
