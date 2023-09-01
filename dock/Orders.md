# Orders API Spec

## Create Orders by Users

Endpoint : POST /api/users/orders

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "item": 1, //id item
    "qty": 2
}
```

Response Body Success :

```json
{
    "data": {
        "qty": 2,
        "total_price": "2000",
        "item": {
            "name": "item",
            "price": "1000"
        }
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Get Data Orders by Users

Endpoint : GET /api/users/current/orders

Headers :
- Authorization : Bearer {token}

Response Body Success :

```json
{
    "data": [
        {
            "id": 1,
            "uuid": "805862bf-2511-4e4d-a798-3e9c0b1b205d",
            "qty": 2,
            "total_price": "2000",
            "item": {
                "name": "item",
                "price": "1000",
                "stock": 7,
                "description": "item baru",
                "seller": {
                    "name": "sellers",
                    "email": "sellers@gmail.com",
                    "address": "indonesia"
                }
            }
        }
    ]
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Update Orders

Endpoint : PATCH /api/users/orders/:uuid

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "qty": 1
}
```

Response Body Success :

```json
{
    "data": {
        "qty": 1,
        "total_price": "1000",
        "item": {
            "name": "item",
            "price": "1000"
        }
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Delete Orders

Endpoint : DELETE /api/users/orders/:uuid

Headers :
- Authorization : Bearer {token}

Response Body Success :

```json
{
    "data": "Ok"
}
```

Response Body Error :

```json
{
    "message": "Orders not found"
}
```