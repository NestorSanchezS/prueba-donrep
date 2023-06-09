# Etapa de construcción
FROM node:14.17.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.21.0-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
