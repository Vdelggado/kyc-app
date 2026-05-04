# Edupan - Plataforma KYC

Este repositorio contiene la plataforma KYC dividida en dos proyectos principales y los esquemas de base de datos.
- `kyc-backend`: API desarrollada con Node.js y NestJS.
- `kyc-app`: Frontend desarrollado con React y Next.js.
- `database`: Archivos SQL con el esquema de la base de datos.

A continuación, se detallan las instrucciones paso a paso para levantar ambos proyectos de forma local.

---

## 1. Base de Datos (SQL Server)

El proyecto requiere un motor de base de datos **SQL Server (MSSQL)**.

**Pasos para configurar:**
1. Asegúrate de tener una instancia de SQL Server corriendo (por defecto en el puerto `1433`).
2. Crea una base de datos vacía llamada `kyc-app`.
3. Ejecuta el script SQL en la base de datos para inicializar las tablas necesarias:
   - Archivo a ejecutar: `database/schema.sql`

---

## 2. Backend API (`kyc-backend`)

El backend de la aplicación, configurado para exponer los endpoints en el puerto `3001`.

**Prerrequisitos:**
- Node.js instalado.
- Revisa el archivo `.env` dentro de la carpeta `kyc-backend` que contiene la configuración de conexión y secretos. Los valores esperados por defecto son:
  - `DB_USER=`
  - `DB_PASSWORD=`
  - `DB_NAME=`

**Pasos para levantar:**
1. Abre una terminal y navega a la carpeta del backend:
   ```bash
   cd kyc-backend
   ```
2. Instala todas las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run start:dev
   ```
   > La API y el backend estarán ejecutándose en `http://localhost:3001`

---

## 3. Frontend App (`kyc-app`)

Esta es la interfaz de usuario. Debe levantarse una vez el backend ya esté funcionando en segundo plano.

**Prerrequisitos:**
- Node.js instalado.
- El proyecto `kyc-backend` debe estar corriendo para poder consumir la API y el servicio de `better-auth`.

**Pasos para levantar:**
1. Mantén la consola del backend corriendo, abre una **nueva terminal** y navega a la carpeta del frontend:
   ```bash
   cd kyc-app
   ```
2. Instala las dependencias requeridas:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Next.js:
   ```bash
   npm run dev
   ```
   > Ahora el frontend estará disponible en tu navegador en `http://localhost:3000`

---
