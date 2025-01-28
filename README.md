# API Documentation

## Base URL
```
http://localhost:7777/api
```

---

## Authentication Routes

### 1. Register a User
**Endpoint:**
```
POST /auth/register
```
**Description:** Registers a new user.
**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
**Responses:**
- `201`: User has been created.
- `409`: User already exists.
- `500`: Server error.

### 2. Login a User
**Endpoint:**
```
POST /auth/login
```
**Description:** Authenticates the user and sets a cookie with the access token.
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Responses:**
- `200`: Returns user data excluding the password.
- `401`: Incorrect password or email.
- `404`: User not found.
- `500`: Server error.

### 3. Logout a User
**Endpoint:**
```
POST /auth/logout
```
**Description:** Logs out the user and clears the access token cookie.
**Responses:**
- `200`: User has been logged out.

---

## Post Routes

### 1. Get All Posts
**Endpoint:**
```
GET /posts
```
**Description:** Retrieves all posts.
**Responses:**
- `200`: Returns an array of posts.
- `500`: Server error.

### 2. Get My Posts
**Endpoint:**
```
GET /posts/my-posts
```
**Description:** Retrieves posts created by the authenticated user.
**Headers:**
```
Cookie: accesToken=<token>
```
**Responses:**
- `200`: Returns an array of posts created by the user.
- `401`: User not logged in.
- `403`: Invalid token.
- `500`: Server error.

### 3. Add a Post
**Endpoint:**
```
POST /posts
```
**Description:** Creates a new post.
**Headers:**
```
Cookie: accesToken=<token>
```
**Request Body:**
```json
{
  "content": "string",
  "media_url": "string"
}
```
**Responses:**
- `200`: Post has been created.
- `401`: User not logged in.
- `403`: Invalid token.
- `500`: Server error.

### 4. Delete a Post
**Endpoint:**
```
DELETE /posts/:id
```
**Description:** Deletes a post by ID if the user is the owner.
**Headers:**
```
Cookie: accesToken=<token>
```
**Responses:**
- `200`: Post has been deleted.
- `401`: User not logged in.
- `403`: Invalid token or unauthorized to delete the post.
- `500`: Server error.

### 5. Edit a Post
**Endpoint:**
```
PATCH /posts/:id
```
**Description:** Updates a post by ID if the user is the owner.
**Headers:**
```
Cookie: accesToken=<token>
```
**Request Body:**
```json
{
  "content": "string",
  "media_url": "string"
}
```
**Responses:**
- `200`: Post has been edited.
- `401`: User not logged in.
- `403`: Invalid token or unauthorized to edit the post.
- `500`: Server error.

---

## Upload Routes

### Upload Media File
**Endpoint:**
```
POST /uploads
```
**Description:** Uploads a media file to the server.
**Request:**
- `multipart/form-data` with a file field named `media_url`.
**Responses:**
- `200`: Returns the URL of the uploaded file.
```json
{
  "url": "/api/uploads/<filename>"
}
```

**Static Files:**
Uploaded files are served from the `/api/uploads` directory.

---

## Error Codes
- `401`: Unauthorized, user not logged in.
- `403`: Forbidden, invalid token or unauthorized action.
- `404`: Resource not found.
- `409`: Conflict, e.g., user already exists.
- `500`: Internal server error.

