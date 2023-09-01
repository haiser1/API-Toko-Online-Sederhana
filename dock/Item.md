# Item API Spec

## Add Item by Sellers

Endpoint : POST /api/sellers/item

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "name": "item",
    "price": "1000",
    "stock": 10,
    "description": "item baru"
}
```

Response Body Success :

```json
{
    "data": {
        "name": "item",
        "price": "1000",
        "stock": 10,
        "description": "item baru"
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Get Items Added by Seller

Endpoint : GET /api/sellers/item/:uuid

Headers :
- Authorization : Bearer {token}

Response Body Success :

```json
{
    "data": {
        "uuid": "random uuid",
        "name": "item",
        "price": "1000",
        "stock": 10,
        "sold": 1,
        "description": "item baru"
    }
}
```

Response Body Error :

```json
{
    "message": "Item not found"
}
```

## Update Item

Endpoint : PATCH /api/sellers/item/:uuid

Headers :
- Authorization : Bearer {token}

Request Body :

```json
{
    "name": "item update", //optional
    "price": "100", //optional
    "stock": "9", //optional
    "description": "item baru update" //optional
}
```

Response Body Success :

```json
{
    "data": {
        "name": "item update", 
        "price": "100", 
        "stock": "9", 
        "description": "item baru update"
    }
}
```

Response Body Error :

```json
{
    "message": "Item not found"
}
```

## Search Item by Sellers

Endpoint : GET /api/sellers/items/search

Headers :
- Authorization : Bearer {token}

Query Params :
- name : Search by name item, using like, optional
- price : Search by price item, using like, optional
- stock : Search by stock item, using like, optional
- sold : Search by sold item, using like, optional
- description : Search by description, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "data": [
        {
            "uuid": "random uuid",
            "name": "item",
            "price": "1000",
            "stock": 10,
            "sold": 1,
            "description": "item baru"
        },
        {
            "uuid": "random uuid",
            "name": "item",
            "price": "1000",
            "stock": 10,
            "sold": 1,
            "description": "item baru"
        },
    ],
    "pagging": {
        "page": 1,
        "total_page": 2,
        "total_item": 20
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Search Item by Users

Endpoint : GET /api/users/item/search

Headers :
- Authorization : Bearer {token}

Query Params :
- name : Search by name item, using like, optional
- price : Search by price item, using like, optional
- stock : Search by stock item, using like, optional
- sold : Search by sold item, using like, optional
- description : Search by description, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "data": [
        {
            "id": 1,
            "uuid": "random uuid",
            "name": "item",
            "price": "1000",
            "stock": 10,
            "sold": 1,
            "description": "item baru"
        },
        {
            "id": 2,
            "uuid": "random uuid",
            "name": "item",
            "price": "1000",
            "stock": 10,
            "sold": 1,
            "description": "item baru"
        },
    ],
    "pagging": {
        "page": 1,
        "total_page": 2,
        "total_item": 20
    }
}
```

Response Body Error :

```json
{
    "message": "Unauthorized"
}
```

## Delete Item

Endpoint : DELETE /api/sellers/item/:uuid

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
    "message": "Item not found"
}
```