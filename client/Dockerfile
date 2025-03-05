# Etapa de construcción: usa Node.js para construir la app
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Aumenta el límite de memoria a 4096 MB
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build

# Etapa final: usa Nginx para servir los archivos estáticos
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

