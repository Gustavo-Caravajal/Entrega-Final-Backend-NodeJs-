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