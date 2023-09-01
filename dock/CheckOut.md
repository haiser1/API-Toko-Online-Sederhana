# Check Out API Spec

## Check Out by Users

Endpoint : POST /api/users/orders/check-out

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "id_orders": 1
}
```

Response Body Success :

```json
{
    "data": {
        "uuid": "7051559c-c7ff-44e6-8b43-4feea5df87b8",
        "total_paid": "1000",
        "order": {
            "qty": 1,
            "total_price": "1000",
            "item": {
                "name": "item",
                "price": "1000",
                "seller": {
                    "name": "sellers",
                    "email": "sellers@gmail.com",
                    "no_hp": "0812345678",
                    "address": "indonesia"
                }
            }
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

## Get History Check Out

Endpoint : GET /api/users/orders/check-out

Headers :
- Authorization : Bearer {token}

Query Params :
- name : Search by name item, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "data": [
        {
            "uuid": "random uuid",
            "total_price": "1000",
            "qty": 1,
            "item": {
                "name": "item",
                "price": "1000",
                "seller": {
                    "name": "sellers",
                    "email": "sellers@gmail.com",
                    "no_hp": "0812345678",
                    "address": "indonesia"
                }
            }
        },
    ],
    "pagging": {
        "page": 1,
        "total_page": 1,
        "total_item": 2,
    }
}
```

Response Body Error :