# syntax=docker/dockerfile:1
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


FROM node:18-alpine

WORKDIR /app
COPY package*.json .
RUN pwd && ls -lah && npm install --omit=dev && npm cache clean --force
COPY . .
COPY --from=build /app/.next/ .next/


ENV DB_FILE=db/db.json.gz MODEL_ENDPOINT=http://0.0.0.0:8000 NODE_ENV=production
EXPOSE 9999
CMD npm run start