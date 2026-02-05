"# BookManagementApi

I deploy it on Vercel with

`https://book-management-api-six.vercel.app/`

This is the backend for the Book Management Application, built with Express.js, Sequelize (PostgreSQL), and JWT Authentication.

## Base URL
Prefix all routes with `/api`.
Example: `https://book-management-api-six.vercel.app/api`

---

## Authentication APIs
Base path: `/auth`

### 1. Register
Create a new user account.
- **Endpoint:** `POST /auth/register`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "yourpassword"
  }
  ```

### 2. Login
Authenticate a user and return a JWT token.
- **Endpoint:** `POST /auth/login`
- **Body:**
  ```json
  {
    "email": "jane@example.com",
    "password": "yourpassword"
  }
  ```

### 3. Get Current User ("Me")
Get profile information of the currently logged-in user.
- **Endpoint:** `GET /auth/me`
- **Headers:** `Authorization: <token>`

---

## Book APIs
Base path: `/books`

### 1. Get All Books
Retrieve a paginated list of books.
- **Endpoint:** `GET /books`
- **Headers:** `Authorization: <token>`
- **Query Parameters:**
  - `current`: Page number (default: 1)
  - `pageSize`: Items per page (default: 10)
  - `genre`: Filter by genre (optional)
- **Response Headers:**
  - `X-Total-Count`: Total number of books matching filters.

### 2. Get Book Detail
Get details of a specific book.
- **Endpoint:** `GET /books/detail/:id`
- **Headers:** `Authorization: <token>`

### 3. Create Book
Add a new book to the database.
- **Endpoint:** `POST /books`
- **Headers:** `Authorization: <token>`
- **Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "published_year": 2023,
    "genre": "Mystery"
  }
  ```

### 4. Update Book
Update an existing book's information.
- **Endpoint:** `PATCH /books/:id`
- **Headers:** `Authorization: <token>`
- **Body:** (Any combination of fields)
  ```json
  {
    "title": "New Title",
    "genre": "Fantasy"
  }
  ```

### 5. Delete Book
Remove a book from the database.
- **Endpoint:** `DELETE /books/:id`
- **Headers:** `Authorization: <token>`

### 6. Book Report
Get aggregated book statistics grouped by year and genre.
- **Endpoint:** `GET /books/report`
- **Query Parameters:**
  - `startYear`: Filter books from this year (inclusive)
  - `endYear`: Filter books up to this year (inclusive)
  - `genre`: Filter by specific genre (optional)" 
