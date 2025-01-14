FROM node:16


# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package*.json ./

# Instalar las dependencias (esto incluirá sqlite3)
RUN npm install

# Copiar el código fuente del backend
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar el servidor
CMD ["npm", "start"]
