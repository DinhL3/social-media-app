# Backend

## Endpoints

### Login

**URL** : `http://localhost:5000/api/auth/login`

Example:

```
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "password123"
}'
```

### Register

**URL** : `http://localhost:5000/api/auth/register`

Example:

```
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "password123"
}'
```

The endpoints below require the logged in user credentials sent from frontend cookies.
Example

### Create New Post

**URL** : `http://localhost:5000/api/posts/newPost`

### Get All Posts

**URL** : `http://localhost:5000/api/posts/`

### Add Comment to a Post

**URL** : `http://localhost:5000/api/posts/:postId/comments`
