
# JGR Construction API

Sistema backend para la prueba técnica Fullstack (Node.js + Express + SQL Server) que implementa autenticación JWT y un CRUD protegido de tareas.

## 🚀 Tecnologías
- Node.js + Express
- TypeScript
- SQL Server (Docker)
- JWT para autenticación

---

## ⚙️ Configuración y ejecución

### 1. Clona el repositorio
```bash
git clone https://github.com/nestordqa/jgr-construction-api
cd jgr-construction-api
```

### 2. Variables de entorno
Crea un archivo `.env` en la raíz con el siguiente contenido (puedes modificar los valores si lo necesitas):

```env
PORT=4000
DB_SERVER=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=JGRConstruction123!
DB_NAME=JGRConstructionDB
JWT_SECRET=jgr_construction_secret_key
JWT_EXPIRES_IN=1h
```

### 3. Instala las dependencias
```bash
npm install
```

### 4. Levanta la base de datos (Docker)
```bash
npm run docker:up
```

### 5. Inicializa la base de datos (crea tablas y datos base)
```bash
npm run init-db
```

### 6. Inicia el servidor backend
```bash
npm run dev
```

---

## 📚 Endpoints principales

### Autenticación

- **POST /api/auth/register**
	- Registro de usuario
	- Body:
		```json
		{
			"email": "test@example.com",
			"password": "Test1234!"
		}
		```

- **POST /api/auth/login**
	- Login de usuario
	- Body:
		```json
		{
			"email": "test@example.com",
			"password": "Test1234!"
		}
		```
	- Respuesta: `{ token: <jwt> }`

### Tareas (protegido, requiere JWT en header Authorization)

- **GET /api/tasks**
	- Listar tareas del usuario

- **POST /api/tasks**
	- Crear tarea
	- Body:
		```json
		{
			"title": "Mi primera tarea",
			"description": "Descripción opcional"
		}
		```

- **GET /api/tasks/:id**
	- Obtener tarea por ID

- **PUT /api/tasks/:id**
	- Actualizar tarea
	- Body:
		```json
		{
			"title": "Tarea actualizada",
			"description": "Nueva descripción",
			"isCompleted": true
		}
		```

- **DELETE /api/tasks/:id**
	- Eliminar tarea

---

## 🧪 Pruebas rápidas
Puedes usar Thunder Client, Postman o similar. Recuerda:
- Registrar usuario → Login → Copiar token → Usar en endpoints de tareas.

---

## 🗄️ Backup de la base de datos
El archivo `sql/init.sql` contiene el script para crear la base de datos y tablas necesarias.

¡Éxito usando la API! 🚧
