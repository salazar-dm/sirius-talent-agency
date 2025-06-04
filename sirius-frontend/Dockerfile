FROM node:18-alpine

WORKDIR /sirius-frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 3000
ENV PORT 3000
CMD ["sh", "-c", "serve -s dist -l $PORT"]
