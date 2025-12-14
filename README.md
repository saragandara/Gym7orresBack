# Tablas Gym Backend

Backend API para gestión de tablas de gimnasio desarrollado con Node.js, Express, TypeScript y MongoDB.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **TypeScript** - Lenguaje de programación
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- MongoDB (local o Atlas)

## 🔧 Instalación

1. Clona el repositorio
```bash
git clone <url-del-repositorio>
cd tablas-gym-back
```

2. Instala las dependencias
```bash
npm install
```

3. Configura las variables de entorno
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tablas-gym
NODE_ENV=development
```

## 🏃 Ejecución

### Modo desarrollo
```bash
npm run dev
```

### Modo producción
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
tablas-gym-back/
├── src/
│   ├── config/         # Configuraciones (database, etc)
│   ├── controllers/    # Controladores de rutas
│   ├── models/         # Modelos de Mongoose
│   ├── routes/         # Definición de rutas
│   └── index.ts        # Punto de entrada
├── dist/               # Código compilado
├── .env                # Variables de entorno
├── .env.example        # Ejemplo de variables de entorno
├── package.json
└── tsconfig.json
```

## 🔌 Endpoints Disponibles

### Base
- `GET /` - Estado del servidor

### Ejemplo (plantilla)
- `GET /api/examples` - Obtener todos
- `GET /api/examples/:id` - Obtener por ID
- `POST /api/examples` - Crear nuevo
- `PUT /api/examples/:id` - Actualizar
- `DELETE /api/examples/:id` - Eliminar

## 🗄️ Conexión a MongoDB

El proyecto está configurado para conectarse a MongoDB. Asegúrate de tener:

1. **MongoDB local**: Instalado y ejecutándose en `mongodb://localhost:27017`
2. **MongoDB Atlas**: Obtén tu URI de conexión y actualiza `MONGODB_URI` en `.env`

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta el servidor compilado
- `npm run lint` - Ejecuta el linter

## 🛠️ Desarrollo

Para agregar nuevas funcionalidades:

1. Crea el modelo en `src/models/`
2. Crea el controlador en `src/controllers/`
3. Define las rutas en `src/routes/`
4. Registra las rutas en `src/index.ts`

## 📄 Licencia

ISC
