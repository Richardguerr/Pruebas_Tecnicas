FROM node:16

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package*.json ./

# Instalar las dependencias (esto incluirá sqlite3 si está en package.json)
RUN npm install

# Copiar el código fuente del backend
COPY . .

# Copiar el script wait-for-it.sh y dar permisos de ejecución
COPY ./wait-for-it.sh /app/
RUN chmod +x /app/wait-for-it.sh

# Exponer el puerto 3000
EXPOSE 3000

# Usar wait-for-it.sh para esperar que la base de datos esté lista antes de iniciar el servidor
CMD ["bash", "./wait-for-it.sh", "db:3306", "--", "npm", "start"]
