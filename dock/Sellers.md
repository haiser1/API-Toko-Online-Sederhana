# Sellers API Spec

## Register Sellers
Endpoint : POST /api/sellers/register

Request Body :

```json
{
    "name": "sellers",
    "email": "sellers@gmail.com",
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
        "name": "sellers",
        "email": "sellers@gmail.com",
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

## Login Sellers

Endpoint : POST /api/sellers/login

Request Body :

```json
{
    "email": "sellers@gmail.com",
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

## Refresh Token Sellers

Endpoint : POST /api/sellers/refresh-token

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

## Get Data Sellers Current

Endpoint : GET /api/sellers/current

Headers :
- Authorization : Bearer {token}

Response Body Success :

```json
{
    "data": {
        "name": "sellers",
        "email": "sellers@gmail.com",
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

## Update Data Sellers Current

Endpoint : PATCH /api/sellers/login

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "name": "sellers update", // optional
    "no_hp": "0812345678", // optional
    "address": "Indonesia" // optional
}
```

Response Body Success :

```json
{
    "data": {
        "name": "sellers update", 
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

## Change Password Sellers Current

Endpoint : POST /api/sellers/change-password

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

## Logout Sellers

Endpoint : DELETE /api/sellers/logout

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