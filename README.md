# UserAnalyticsApp

UserAnalyticsApp es una aplicación web construida con Django Rest Framework para el backend y React para el frontend. Proporciona análisis e información de usuarios.

## Esta configurado para una base de datos postgresql

## Descripción del Proyecto

Esta aplicación permite a los usuarios rastrear y analizar datos de usuarios. El backend está impulsado por Django Rest Framework, proporcionando una API robusta, mientras que el frontend está construido con React, ofreciendo una interfaz de usuario dinámica y receptiva.

---

## Instalación

### Requisitos previos

- **Python** (versión 3.8 o superior)
- **Node.js** (versión 16 o superior)
- **PostgreSQL** (instalado y configurado)

---

### Backend

1. Clona el repositorio:
    ```bash
    git clone https://github.com/yeinerpb/panzofi-prueba-tecnica.git
    cd UserAnalyticsApp
    ```

2. Accede a la carpeta backend, crea un entorno virtual y actívalo:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
    ```

3. Instala los paquetes requeridos:
    ```bash
    pip install -r requirements.txt
    ```

4. Configura las variables de entorno en el archivo `.env`.

5. Restaura la base de datos desde el archivo de respaldo:
    ```bash
    pg_restore -U <tu_usuario> -d <nombre_de_la_base_de_datos> backend/backup_panzofi.backup
    ```

## Restaurar la base de datos

El archivo de respaldo de la base de datos **`backup_panzofi.backup`** está ubicado en la carpeta `backend`.

### Pasos para restaurar:

1. Asegúrate de tener PostgreSQL instalado y configurado.
2. Crea una nueva base de datos en PostgreSQL con el nombre que aparece en el archivo `.env` (variable `DB_NAME`).
3. Restaura la base de datos ejecutando:
    ```bash
    pg_restore -U <tu_usuario> -d <nombre_de_la_base_de_datos> backend/backup_panzofi.backup
    ```
4. Alternativamente, puedes usar **pgAdmin**:
   - Abre pgAdmin y selecciona tu servidor conectado.
   - Crea una nueva base de datos o selecciona una existente.
   - Haz clic derecho en la base de datos y selecciona **"Restore..."**.
   - En el campo **Filename**, selecciona `backend/backup_panzofi.backup`.
   - Haz clic en **Restore**.

---

6. Aplica las migraciones:
    ```bash
    python manage.py migrate
    ```

7. Ejecuta el servidor de desarrollo:
    ```bash
    python manage.py runserver
    ```

---

### Frontend

1. Navega al directorio del frontend:
    ```bash
    cd frontend
    ```

2. Instala los paquetes requeridos:
    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

---

## Uso

1. Abre tu navegador web y ve a `http://localhost:5173` para acceder al frontend de React.
2. La API del backend se puede acceder en `http://localhost:8000/api/`.

---

## Notas adicionales

- Para asegurar la compatibilidad, las versiones de Python, Node.js, y PostgreSQL deben coincidir con las utilizadas durante el desarrollo.
- En caso de problemas, revisa el archivo `.env` para confirmar que las variables de entorno están correctamente configuradas.
- El usuario admin es: admin1  y su contraseña: password1
- Los usuarios regulares son: user1 = password1, user2 = password2, user3 = password3 y en esa misma secuencia para los demas usuarios

---
