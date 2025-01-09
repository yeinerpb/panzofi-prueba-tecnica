# UserAnalyticsApp

UserAnalyticsApp es una aplicación web construida con Django Rest Framework para el backend y React para el frontend. Proporciona análisis e información de usuarios.

## Descripción del Proyecto

Esta aplicación permite a los usuarios rastrear y analizar datos de usuarios. El backend está impulsado por Django Rest Framework, proporcionando una API robusta, mientras que el frontend está construido con React, ofreciendo una interfaz de usuario dinámica y receptiva.

## Instalación

### Backend

1. Clona el repositorio:
    ```bash
    git clone https://github.com/yourusername/UserAnalyticsApp.git
    cd UserAnalyticsApp
    ```

2. Accede a la carpeta backend y crea un entorno virtual y actívalo:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
    ```

3. Instala los paquetes requeridos:
    ```bash
    pip install -r requirements.txt
    ```

4. Aplica las migraciones:
    ```bash
    python manage.py migrate
    ```

5. Ejecuta el servidor de desarrollo:
    ```bash
    python manage.py runserver
    ```

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
    npm start
    ```

## Uso

1. Abre tu navegador web y ve a `http://localhost:5173` para acceder al frontend de React.
2. La API del backend se puede acceder en `http://localhost:8000/api/`.
