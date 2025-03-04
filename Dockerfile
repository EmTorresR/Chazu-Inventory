# Usa una imagen ligera de Node.js (por ejemplo, versión 16 en Alpine)
FROM node:16-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que utiliza el servidor (en tu caso, 5000)
EXPOSE 5000

# Comando para arrancar el servidor
CMD ["node", "src/index.js"]
