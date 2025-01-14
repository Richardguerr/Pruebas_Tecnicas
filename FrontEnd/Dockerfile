# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del frontend (todos los archivos en el directorio donde se encuentra el Dockerfile) al contenedor
COPY . /app

# Instalar http-server
RUN npm install -g http-server

# Exponer el puerto en el que el frontend estará disponible
EXPOSE 8080

# Comando para iniciar http-server y servir los archivos estáticos
CMD ["http-server", ".", "-p", "8080"]
