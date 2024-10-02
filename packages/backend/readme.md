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
