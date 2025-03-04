# Etapa de construcción: usa Node.js para construir la app
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa final: usa Nginx para servir los archivos estáticos
FROM nginx:alpine
# Copia los archivos generados al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
