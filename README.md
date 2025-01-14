# Alcance
- Crear un sistema de información para el monitoreo y gestión de actividades agronómicas.
- Proveer una interfaz para que los campesinos registren y consulten sus actividades diarias.
- Implementar una base de datos que almacene las actividades y detalles de las parcelas.
- Desplegar la solución utilizando Docker.

# Requerimientos Funcionales
- Registrar actividades agronómicas (siembra, riego, fertilización, cosecha).
- Visualizar un historial de actividades por parcela.
- Generar reportes básicos de productividad por cultivo o parcela.

# Requerimientos No Funcionales
- Sistema desplegable mediante Docker.
- Interfaz sencilla y amigable.
- Escalable para soportar múltiples usuarios.

# Arquitectura de Software
- **Backend**: API REST desarrollada en Node.js con Express.
- **Base de datos**: SQL (relacional).
- **Frontend**: Aplicación en JavaScript para interactuar con los usuarios.
- **Docker**: Contenedores para backend, frontend y base de datos.

# Modelo de la Base de Datos
## Tablas principales
### Parcelas
- `id`
- `ubicación`
- `tamaño`
- `cultivo_actual`

### Actividades
- `id`
- `fecha`
- `tipo_actividad`
- `insumos`
- `duración`
- `parcela_id`


# Gestión Agronómica - Frontend y Backend

Este proyecto combina un frontend y backend empaquetados en un contenedor Docker. El backend gestiona las solicitudes API mientras que el frontend maneja la interfaz de usuario.

---

## Tabla de Contenidos

1. [Requisitos Previamente Instalados](#requisitos-previamente-instalados)
2. [Instalación del Proyecto](#instalación-del-proyecto)
3. [Ejecución del Proyecto](#ejecución-del-proyecto)
4. [Funcionalidades](#funcionalidades)
5. [Información Adicional](#información-adicional)

---

## Requisitos Previamente Instalados

- Docker: [Descargar Docker](https://docs.docker.com/get-docker/)
- Docker Compose 

---

## Instalación del Proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone git@github.com:Richardguerr/Pruebas_Tecnicas.git

2. **Crear imagenes Docker**:
   ```bash
   docker-compose build
3. **Ejecutar Contenedor**:
   ```bash
   docker-compose up
