# 🛒 Módulo Orden de Compras - Frontend

Este es el frontend del módulo para creación y gestión de ordenes de compra, Desarrollado con React, este proyecto premite:

- Crear nuevas órdenes con validaciónes desde el frontend
- Visualizar por medio de un datatable el listado de ordenes de compra existentes, y descargarlo en excel
- Desde la Tabla gestionar la orden, editarla y ver sus detalles y eliminarla.
- Filtrar y buscar órdenes existentes

## Requisitos Previos

- Node.js v16+
- npm v8+ o pnpm

## 🚀 Tecnologías utilizadas

- ⚛️ React (Vite)
- 💨 TailwindCSS
- 🏪 Zustand (gestión de estado)
- 📝 React Hook Form (formularios y validación)
- ⚛️ React-Router-dom
- 🧮 TypeScript
- 🎨 react-toastify- sweetalert /UI (componentes)
- 🔗 Axios (HTTP)
- 🏪Zod (declaracion y validacion de schemas en las respuestas axios)
- DataTables(datatable.net)

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/modulo-orden-compras-frontend.git
cd modulo-orden-compras-frontend
```

2. Instalar dependencias:

```bash

pnpm install
# o
npm install

```

3. Configurar variables de entorno, coloca tu url local, crea el arcchivo .env.local y pega:

```bash

VITE_API_URL = http://localhost:8000/api

```

4. Iniciar la aplicación:

```bash
pnpm run dev
# o
npm run dev


```

---

### Explicación de la estructura:

- **`public/`**: Contiene archivos estáticos como imagenes.
- **`src/`**: Contiene todo el código fuente de la aplicación.
  - **`components/`**: Componentes de React que se reutilizan en la aplicación.
  - **`layouts/`**: componente de react que se va a reutilizar en las vistas que se importe.
  - **`views/`**: Archivos que contienen las vistas del proyecto.
  - **`store/`**: Archivos que gestionan el estado global del proyecto (en este caso, se usa Zustand).
  - **`services/`**: Archivo con las funciones para hacer las peticiones con axios al backend, validar respuesta y errores.
  - **`/types`**: Archivos que contienen los tipos para usar en el proyecto.
  - **`helpers/`**: Archivos que contienen código que se reutiliza en la aplicación como formatear, etc..
  - **`lib/`**: Contiene el archivo de configuracion de axios de la aplicacion como el baseURL que vienen de las variables de entorno
  - **`index.css`**: archivo de estilos de la aplicación, y de las importación de tailwind
  - **`main.tsx`**: Punto de entrada donde se renderiza el componente principal.
- **`.gitignore`**: Archivos que no deben ser versionados por git (por ejemplo, `node_modules`).
- **`package.json`**: Contiene las dependencias y los scripts del proyecto.
- **`tailwind.config.js`**: Configuración de TailwindCSS.
- **`tsconfig.json`**: Configuración de TypeScript para el proyecto.
- **`README.md`**: Este archivo donde se documenta el proyecto.

---

# 🌐 Demo Online

Próximamente...

# Autor

- Juan Jose Leon

## 📄 Licencia

Este proyecto **no tiene licencia definida**. Puedes Clonarlo y estudiarlo.
