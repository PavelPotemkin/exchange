FROM node:20-alpine as base
WORKDIR /app
COPY ./package*.json /app/
RUN npm ci
COPY . .

FROM node:20-alpine as build
WORKDIR /app
COPY --from=base /app/ /app/
RUN npm run build

FROM node:20-alpine as prod
WORKDIR /app
COPY --from=build /app/ /app/
