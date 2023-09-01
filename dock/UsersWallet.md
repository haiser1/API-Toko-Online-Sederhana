# Users Wallet API Spec

## Create Users Wallet

Endpoint : POST /api/users/wallet

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "no_wallet": "12345678",
}
```

Response Body Success :

```json
{
    "data": {
        "no_wallet": "12345678",
        "balance": "0"
    }
}
```

Response Body Error :

```json
{
    "message": "No wallet already registered"
}
```

## Get Data Wallet

Endpoint : GET /api/users/wallet

Headers :
- Authorization : Bearer {token}

Response Body Success :

```json
{
    "data": {
        "no_wallet": "12345678",
        "balance": "0"
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Update Balance Wallet

Endpoint : PATCH /api/users/wallet

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "balance": "1000"
}
```

Response Body Success :

```json
{
    "data": {
        "balance": "1000"
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```
