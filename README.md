# API REST - PROYECTO FINAL BACKEND NODEJS

## Descripción

API REST para la gestión de productos desarrollada con Node.js y express

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias:

```bash
npm install
```

3. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo y completar los datos requeridos
cp .env-example .env
```

Luego editar el archivo `.env` con los valores correspondientes para tu entorno

4. Ejecutar en modo desarrollo

```bash
npm run dev
```

## Documentacion de la API

### Obtener todos los productos

- **GET** `/products`
- **Descripción:** Devuelve la lista de todos los productos.
- **Ejemplo de uso:** `/products`
- **Respuesta ejemplo:**
```json
[
    {
        "id": "1",
        "price": 899998,
        "categories": [
            "Tecnología",
            "Computadoras",
            "Notebooks"
        ],
        "title": "Notebook Lenovo IdeaPad 3"
    },
    {
        "id": "2",
        "categories": [
            "Tecnología",
            "Accesorios",
            "Periféricos"
        ],
        "title": "Mouse Inalámbrico Logitech M185",
        "price": 24999
    },
    {
        "id": "3",
        "categories": [
            "Tecnología",
            "Periféricos",
            "Gaming"
        ],
        "title": "Teclado Mecánico Redragon Kumara",
        "price": 69997
    }
]
```

- **GET** `/products/search?name=palabra`
- **Descripción:** Devuelve los productos cuyo nombre contiene la palabra indicada.
- **Parámetros:**
    - `title` (query, requerido): texto a buscar en el nombre del producto.
- **Ejemplo de uso:** `/products/search?name=leno`
- **Respuesta ejemplo:** 

```json
[
    {
        "id": "1",
        "price": 899998,
        "categories": [
            "Tecnología",
            "Computadoras",
            "Notebooks"
        ],
        "title": "Notebook Lenovo IdeaPad 3"
    }
]
```

### Obtener producto por ID

- **GET** `/product/:id`
- **Descripión:** Devuelve un producto específico por su ID.
- **Parámetros:**
    - `id` (path, requerido): ID del producto.
- **Ejemplo de uso:** `/products/3`
- **Respuesta ejemplo:**

```json
{
    "id": "3",
    "categories": [
        "Tecnología",
        "Periféricos",
        "Gaming"
    ],
    "title": "Teclado Mecánico Redragon Kumara",
    "price": 69997
}
```

### Crear un producto

- **POST** `/products`
- **Descripción:** Crea un nuevo producto.
- **Body (JSON):**

```json
{
    "categories": [
        "Categoria 1",
        "Categoria 2",
        "Categoria 3"
    ],
    "title": "Title 1",
    "price": 700000
}
```

- **Respuesta ejemplo:**
```json
{
    "id": "auHu5qJwFVR1b8rYwTuY",
    "title": "Title 1",
    "price": 700000,
    "categories": [
        "Categoria 1",
        "Categoria 2",
        "Categoria 3"
    ]
}
```

### Eliminar un producto

- **DELETE** `/products/:id`
- **Descripción:** Elimina un producto por su ID.
- **Parámetros:**
    - `id` (path, requerido): ID del producto a eliminar.
- **Respuesta:** 204 No Content 

## Actualizar un producto

* **PUT** `/products/:id`

* **Descripción:** Actualiza la información de un producto existente.

* **Parámetros:**

  * `id` (path, requerido): ID del producto a modificar.

* **Body (JSON):**

```json
{
    "title": "Notebook Lenovo IdeaPad 5",
    "price": 950000,
    "categories": [
        "Tecnología",
        "Computadoras",
        "Notebooks"
    ]
}
```

* **Respuesta ejemplo:**

```json
{
    "id": "1",
    "title": "Notebook Lenovo IdeaPad 5",
    "price": 950000,
    "categories": [
        "Tecnología",
        "Computadoras",
        "Notebooks"
    ]
}
```

---

# Autenticación

La API utiliza autenticación mediante JWT (JSON Web Token).

Las rutas protegidas requieren enviar el token en el header `Authorization` utilizando el formato:

```
Authorization: Bearer TOKEN
```

Ejemplo:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

# Usuarios

## Registrar usuario

* **POST** `/auth/register`
* **Descripción:** Registra un nuevo usuario en el sistema.
* **Body (JSON):**

```json
{
    "email": "usuario@email.com",
    "password": "123456"
}
```

* **Respuesta ejemplo:**

```json
{
    "id": "abc123",
    "email": "usuario@email.com"
}
```

* **Errores posibles:**

### 422 Unprocessable Entity

Cuando faltan datos requeridos.

```json
{
    "error": "Email y contraseña son requeridos"
}
```

### 409 Conflict

Cuando el usuario ya existe.

```json
{
    "error": "El usuario ya existe"
}
```

---

## Login de usuario

* **POST** `/auth/login`

* **Descripción:** Autentica un usuario y devuelve un token JWT para acceder a las rutas protegidas.

* **Body (JSON):**

```json
{
    "email": "usuario@email.com",
    "password": "123456"
}
```

* **Respuesta ejemplo:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

* **Errores posibles:**

### 401 Unauthorized

Credenciales inválidas.

```json
{
    "error": "Email o contraseña incorrectos"
}
```

---

# Manejo de errores

La API utiliza códigos HTTP para indicar el resultado de las operaciones.

## 400 Bad Request

La petición contiene datos inválidos o incompletos.

Ejemplo:

```json
{
    "error": "Datos inválidos"
}
```

---

## 401 Unauthorized

El usuario no está autenticado o no envió un token válido.

Ejemplo:

```json
{
    "error": "Token no proporcionado"
}
```

---

## 403 Forbidden

El usuario está autenticado pero no tiene permisos suficientes para realizar la operación.

Ejemplo:

```json
{
    "error": "Acceso denegado"
}
```

---

## 404 Not Found

La ruta o recurso solicitado no existe.

Ejemplo:

```json
{
    "error": "Not Found"
}
```

---

## 500 Internal Server Error

Error inesperado del servidor o fallo de un servicio externo.

Ejemplo:

```json
{
    "error": "Error interno del servidor"
}
```
