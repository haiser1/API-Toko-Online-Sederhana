# Users API Spec

## Register Users

Endpoint : POST /api/users/register

Request Body :

```json
{
    "name": "user",
    "email": "user@gmail.com",
    "password": "1234",
    "confirm_password": "1234",
    "no_hp": "081234567",
    "address": "indonesia"
}
```

Response Body Success :

```json
{
    "data": {
        "name": "user",
        "email": "user@gmail.com",
        "no_hp": "081234567",
        "address": "indonesia"
    }
}
```

Response Body Error :

```json
{
    "message": "Email already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
    "email": "user@gmail.com",
    "password": "1234"
}
```

Response Body Success :

```json
{
    "token": "JWT" //expired 60s
}
```
Response Cookie :

refresh-token : refresh-token-jwt expired 12h

Response Body Error :

```json
{
    "message": "Email or password wrong"
}
```

## Refresh Token Users

Endpoint : POST /api/users/refresh-token

Cookies : refresh-token

Response Body Success :

```json
{
    "token": "JWT" //expired 60s
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Get Data Users Current

Endpoint : GET /api/users/current

Headers :
- Authorization : Bearer {token}

Response Body Success :

```json
{
    "data": {
        "name": "user",
        "email": "user@gmail.com",
        "no_hp": "081234567",
        "address": "indonseia"
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Update Data Users Current

Endpoint : PATCH /api/users/login

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "name": "user update", // optional
    "no_hp": "0812345678", // optional
    "address": "Indonesia" // optional
}
```

Response Body Success :

```json
{
    "data": {
        "name": "user update", 
        "no_hp": "0812345678", 
        "address": "Indonesia"
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Change Password Users Current

Endpoint : POST /api/users/change-password

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "password": "1234",
    "new_password": "12345",
    "confirm_password": "12345"
}
```

Response Body Success :

```json
{
    "data": "Ok"
}
```

Response Body Error :

```json
{
    "message": "Password wrong"
}
```

## Logout Users

Endpoint : DELETE /api/users/logout

Cookies : refresh-token

Response Body Success :

```json
{
    "data": "Ok"
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```