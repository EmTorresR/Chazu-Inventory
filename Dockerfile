# Usa una imagen ligera de Node.js (por ejemplo, versión 16 en Alpine)
FROM node:16-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el script wait-for-it.sh al contenedor y le asigna permisos de ejecución
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que utiliza el servidor (en este caso, 5000)
EXPOSE 5000

# Comando por defecto (se sobrescribirá en docker-compose)
CMD ["node", "src/index.js"]
