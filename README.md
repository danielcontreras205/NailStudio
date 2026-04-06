# 📦 Estructura del Proyecto Angular - NailStudio

Esta es una estructura recomendada para organizar el proyecto **NailStudio** de forma escalable, limpia y mantenible, especialmente cuando se trabaja con un backend en Spring Boot.

---

## 🧱 Estructura General

```bash
app/
│
├── core/                # Servicios globales (auth, interceptors, guards)
│   ├── services/        # Lógica de negocio global (AuthService, API calls)
│   ├── guards/          # Protección de rutas (AuthGuard)
│   ├── interceptors/    # Interceptores HTTP (JWT, headers)
│   └── models/          # Interfaces y modelos (User, Auth, etc.)
│
├── shared/              # Componentes reutilizables
│   ├── components/      # Navbar, botones, modales, etc.
│   ├── pipes/           # Transformaciones de datos
│   └── directives/      # Directivas personalizadas
│
├── features/            # Módulos funcionales de la app
│   ├── home/            # Página de presentación (landing)
│   ├── auth/            # Login y autenticación
│   └── dashboard/       # Área privada después de login
│
├── layout/              # Plantillas visuales (estructura UI)
│   ├── main-layout/     # Layout principal (navbar + sidebar)
│   └── auth-layout/     # Layout simple (login)
│
├── app-routing.module.ts  # Configuración de rutas
└── app.component.ts       # Componente raíz
```

---

## 🧩 Descripción por módulos

### 🔹 core/

Contiene toda la lógica global de la aplicación.

* **services/** → Manejo de autenticación y conexión con el backend.
* **guards/** → Control de acceso a rutas protegidas.
* **interceptors/** → Agrega automáticamente el token JWT a las peticiones HTTP.
* **models/** → Interfaces TypeScript para tipar datos.

---

### 🔹 shared/

Elementos reutilizables en toda la aplicación.

Ejemplos:

* Navbar
* Botones personalizados
* Pipes (formateo de fechas, moneda, etc.)

---

### 🔹 features/

Cada carpeta representa una funcionalidad principal:

* **home/** → Página pública de presentación.
* **auth/** → Login, autenticación, manejo de sesión.
* **dashboard/** → Todo lo que ve el usuario después de iniciar sesión.

---

### 🔹 layout/

Define la estructura visual de la aplicación.

* **main-layout/**
  Contiene:

  * Navbar
  * Sidebar
  * `<router-outlet>`
    Se usa después del login.

* **auth-layout/**
  Layout simple sin navegación.
  Se usa para login.

---

## 🧭 Flujo de la Aplicación

1. Usuario entra a `/`

   * Ve la página de presentación (Home)

2. Usuario va a `/auth/login`

   * Ingresa credenciales

3. Backend (Spring Boot) responde con JWT

   * Se guarda en `localStorage`

4. Usuario accede a `/dashboard`

   * Se valida con `AuthGuard`
   * Se carga `MainLayout`

---

## 🔐 Autenticación

* Se usa JWT generado por el backend.
* Se almacena en `localStorage`.
* Se envía automáticamente en cada request usando un interceptor:

```http
Authorization: Bearer <token>
```

---

## 🚀 Buenas prácticas

* Separar responsabilidades por carpetas.
* Usar módulos lazy loading (`loadChildren`) para mejorar rendimiento.
* Centralizar la lógica en `core`.
* Reutilizar componentes en `shared`.
* Mantener `features` desacoplados entre sí.

---

## 💡 Nota

Esta estructura está pensada para escalar fácilmente a:

* Gestión de usuarios
* Agenda de citas
* Servicios de negocio (ej: Nail Studio)
* Panel administrativo

---

**Autor:** Proyecto base recomendado para Angular + Spring Boot 🔥
