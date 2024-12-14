# Cookies API

The **Cookies API** is a RESTful API that allows users to interact with a collection of cookie products. This API provides various endpoints for managing cookie products, including creating, updating, deleting, and fetching products.

## Features

- **GET**: Retrieve a list of all cookie products or a specific product by its ID.
- **POST**: Create a new cookie product.
- **PUT**: Update an existing cookie product by its ID.
- **DELETE**: Delete a cookie product by its ID.

## Usage

### Base URL
The base URL for accessing the API is `https://cookies.azurewebsites.net`.

### Authentication
Currently, the API does not require authentication for accessing the available endpoints.

### Endpoints

- **GET /products**: Retrieve a list of all cookie products.
- **GET /products/:id**: Retrieve a specific cookie product by its ID.
- **POST /products**: Create a new cookie product.
- **PUT /products/:id**: Update an existing cookie product by its ID.
- **DELETE /products/:id**: Delete a cookie product by its ID.

### Request and Response Format
Requests and responses are formatted as JSON. The structure of the request and response bodies is documented in the individual endpoint sections.

## Getting Started

To get started with using the Cookies API, follow these steps:

1. Ensure you have access to the internet.
2. Send HTTP requests to the desired endpoints using tools such as cURL, Postman, or your preferred programming language's HTTP library.

## Example

### Retrieve All Products

```http
GET /products HTTP/1.1
Host: cookies.azurewebsites.net
```

```json
{
  "products": [
    {
      "_id": "65edd1bfbde8aa7d900e7bcc",
      "name": "Chocolate Chip Cookie",
      "image": "https://example.com/chocolate_chip_cookie.jpg",
      "description": "Delicious chocolate chip cookie.",
      "price": 2.99,
      "isNewProduct": false,
      "createdAt": "2024-03-10T15:29:04.054Z",
      "updatedAt": "2024-03-10T15:29:04.054Z"
    },
    {
      "_id": "75d8c1fcd33e1b5ef9b28f4d",
      "name": "Oatmeal Raisin Cookie",
      "image": "https://example.com/oatmeal_raisin_cookie.jpg",
      "description": "Homemade oatmeal raisin cookie.",
      "price": 1.99,
      "isNewProduct": true,
      "createdAt": "2024-03-10T15:29:04.054Z",
      "updatedAt": "2024-03-10T15:29:04.054Z"
    }
  ],
  "totalPages": 2,
  "currentPage": 1
}
```

## Contribution

Contributions to the **Cookies API** project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or create a pull request on GitHub.

---
