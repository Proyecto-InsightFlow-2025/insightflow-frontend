
# InsightFlow — Frontend Application

Aplicación web desarrollada con **React + Vite**, que funciona como la interfaz oficial del ecosistema **InsightFlow**.
Actualmente está integrada con el **Users Service**, **Document Service**, y cuenta con despliegue automático en **Firebase Hosting** mediante CI/CD.

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

### 3. Configuración de servicios

El frontend consume microservicios desplegados en render. Las URLs base están configuradas en los archivos de servicio:

```
VITE_API_URL=https://insightflow-users-service.onrender.com

DOCUMENTS_API_URL=https://document-service-backend.onrender.com
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

## Integración con Servicios

El frontend implementa la comunicación con los siguientes microservicios.

### 1. User Service

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

### 2. Document Service

#### Obtener Todos los Documentos

**GET /documents**

#### Obtener un Documento en específico

**GET /documents/{id}**

#### Crear un Documento

**POST /documents**

#### Actualizar un Documento

**PATCH /documents/{id}**

#### Eliminar un Documento

**DELETE /documents/{id}**

---

## Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables (ProtectedRoute, NavBar, etc.)
├── context/            # AuthContext (estado global)
├── pages/              # Vistas principales
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   ├── DocumentList.tsx
│   ├── DocumentDetail.tsx
│   ├── DocumentCreate.tsx 
│   └── Workspace.tsx
├── services/           # Comunicación con APIs REST
│   ├── userContext.ts      # Integración con Users Service
│   ├── documentContext.ts  # Integración con Documents Service
│   ├── helpers.ts          # Headers y utilidades
│   └── index.ts            # Barril de exportación
├── types/              # Interfaces/DTOs compartidos
└── App.tsx             # Rutas principales de la aplicación
```
