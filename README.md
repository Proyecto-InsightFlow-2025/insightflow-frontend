
# InsightFlow — Frontend Application

Aplicación web desarrollada con **React + Vite**, que funciona como la interfaz oficial del ecosistema **InsightFlow**.
Actualmente está integrada con el **Users Service**, y cuenta con despliegue automático en **Firebase Hosting** mediante CI/CD.

---

## Arquitectura y Diseño

### Tecnologías Base

* **React 18 + TypeScript** (creado con Vite)
* **TailwindCSS** para estilos
* **Lucide React** para iconos
* **React Router DOM** para navegación SPA

### Organización de la App

* **SPA modularizada** (Single Page Application)
* **Capa de servicios (`src/services`)**
  Abstracción para consumir APIs REST.
* **Context API (AuthContext)**
  Manejo del estado global de autenticación.
* **Componentes Reutilizables**
  Ejemplo: `ProtectedRoute` para proteger páginas.

### Seguridad (Naive Auth)

El frontend usa una estrategia simple de autenticación:

1. Tras login, el backend devuelve el **ID del usuario**.
2. Ese ID se guarda en **localStorage**.
3. Para acciones sensibles (PATCH/DELETE), el frontend agrega el parámetro:

   ```
   ?requestUserId=<userId>
   ```
4. El backend valida si el usuario está autorizado.

> No se utiliza JWT.

---

## Despliegue (CI/CD)

Pipeline automatizado mediante **GitHub Actions**:

### CI

* Instala dependencias
* Ejecuta build (`npm run build`)

### CD

* Despliega automáticamente a Firebase Hosting

### Producción

```
https://insightflow-frontend.web.app
```

(Reemplaza con tu URL si es necesario)

---

## Requisitos Previos

Necesitas:

* **Node.js v18 o superior**
* **NPM**
* Conexión a internet para consumir el backend (Render)

---

## Ejecución en Local

### 1. Clonar repositorio

```bash
git clone https://github.com/Proyecto-InsightFlow-2025/insightflow-frontend.git
cd insightflow-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. URL de User Service

Por defecto apunta al backend en producción.

```
VITE_API_URL=https://insightflow-users-service.onrender.com
```

### 4. Ejecutar la app

```bash
npm run dev
```

La app estará disponible en:

```
http://localhost:5173
```

---

## Integración con Servicios (Users Service)

El frontend implementa todas las operaciones del backend de usuarios.

### Endpoints Consumidos

#### Registro

**POST /user**
→ Formulario de registro validado.

#### Login

**POST /user/login**

#### Visualización de Perfil

**GET /user/{id}**

#### Actualización de Perfil

**PATCH /user/{id}?requestUserId={id}`**
→ Se solicita confirmación de contraseña.

#### Eliminación de Cuenta

**DELETE /user/{id}?requestUserId={id}`**
→ Logout automático.

---

## Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables (ProtectedRoute, Layouts, etc.)
├── context/            # AuthContext (estado global)
├── pages/              # Vistas principales (Login, Register, Profile)
├── services/           # Comunicación con APIs REST
│   ├── apicontext.ts   # Funciones y headers base
│   ├── userservice.ts  # Integración con Users Service
│   └── api.ts          # Configuración del cliente HTTP
├── types/              # Interfaces/DTOs compartidos
└── App.tsx             # Rutas principales de la aplicación
```
