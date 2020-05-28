# Grocery Shopping Manager

---
---

## Usuário pode obter a lista de todos os supermercados existentes – { ver filtro }

**GET** ```/api/v1/supermarkets?search=filter```

---

body

```no Body```

---

response ```200```

```json
{
  "data": [
    {
      "_id": {
        "$oid": "5ecbd19a0060065100606ac5"
      },
      "fantasia": "SUPERMERCADO PACHECO",
      "cnpj": "07581644000160",
      "municipio": "PORANGATU",
      "uf": "GO",
      "bairro": "SETOR RODOVIARIO",
      "logradouro": "AV ADELINO AMERICO DE AZEVEDO",
      "numero": "287",
      "cep": "76.550-000",
      "telefone": "(62) 3362-3837",
      "products": []
    }
  ]
}
```

---
---

## Usuário pode obter um supermercado existente com sua lista de produtos – { OK }
**GET** ```/api/v1/supermarkets/:id```

---

body

```no Body```

---

response ```200```

```json
{
  "data": {
    "_id": {
      "$oid": "5ecd6155001cc81200ab45c4"
    },
    "fantasia": "HIPER NORTE",
    "cnpj": "24981871000100",
    "municipio": "PORANGATU",
    "uf": "GO",
    "bairro": "SETOR CENTRAL",
    "logradouro": "R 10 ESQ COM A 13",
    "numero": "SN",
    "cep": "76.550-000",
    "telefone": "(62) 3363-1124",
    "products": []
  }
}
```

response ```404```

```json
{
  "data": {
    "error": "supermarket not found!"
  }
}
```

---
---

## Usuário pode adicionar um supermercado novo – { OK }
**POST** ```/api/v1/supermarkets```

---

body

```json
{
	"cnpj": "34931873000132"
}
```

---

response ```201```

```json
{
  "data": {
    "_id": {
      "$oid": "5ecd6155001cc81200ab45c4"
    },
    "fantasia": "HIPER NORTE",
    "cnpj": "24981871000100",
    "municipio": "PORANGATU",
    "uf": "GO",
    "bairro": "SETOR CENTRAL",
    "logradouro": "R 10 ESQ COM A 13",
    "numero": "SN",
    "cep": "76.550-000",
    "telefone": "(62) 3363-1124",
    "products": []
  }
}
```

response ```400```

```json
{
  "data": {
    "error": "bad request!"
  }
}
```


response ```406```

```json
{
  "data": {
    "error": "main activity is not valid!"
  }
}
```

---
---

## Usuário pode obter a lista de todos os produtos existentes – { ver filtro } 
**GET** ```/api/v1/products?search=filter```

---

body

```no Body```

---

response ```200```

```json
{
  "data": [
    {
      "_id": {
        "$oid": "5ecc07f300706913001892ae"
      },
      "name": "CREME DE LEITE",
      "brand": "PIRACANJUBA",
      "type": "INTEGRAL",
      "unity": "200G",
      "obs": "CAIXINHA",
      "supermarkets": []
    }
  ]
}
```

---
---

## Usuário pode obter um produto existente com sua lista de supermercados – { OK }
**GET** ```/api/v1/products/:id```

---

body

```no Body```

---

response ```200```

```json
{
  "data": {
    "_id": {
      "$oid": "5ecc07f300706913001892ae"
    },
    "name": "CREME DE LEITE",
    "brand": "PIRACANJUBA",
    "type": "INTEGRAL",
    "unity": "200G",
    "obs": "CAIXINHA",
    "supermarkets": []
  }
}
```

response ```404```

```json
{
  "data": {
    "error": "product not found!"
  }
}
```

---
---

## Usuário pode adicionar um produto novo – { OK }
**POST** ```/api/v1/products```

---
body

```json
{
	"name": "refrigerante",
	"brand": "coca cola",
	"type": "tradicional",
	"unity": "2l",
	"obs": ""
}
```

response ```201```

```json
{
  "data": {
    "_id": {
      "$oid": "5ecffa710043304e00a4d906"
    },
    "name": "REFRIGERANTE",
    "brand": "COCA COLA",
    "type": "TRADICIONAL",
    "unity": "2L",
    "obs": "",
    "supermarkets": []
  }
}
```

response ```400```

```json
{
  "data": {
    "error": "all fields are required!"
  }
}
```

response ```404```

```json
{
  "data": {
    "error": "product not found!"
  }
}
```

response ```409```

```json
{
  "data": {
    "error": "product already exist!"
  }
}
```

---
---

## Usuário pode atualizar os dados de um produto – { OK }
**PUT** ```/api/v1/products/:id```

---
body

```json
{
	"name": "refrigerante",
	"brand": "coca cola",
	"type": "tradicional",
	"unity": "2l",
	"obs": ""
}
```

response ```200```

```json
{
  "data": {
    "_id": {
      "$oid": "5ecffa710043304e00a4d906"
    },
    "name": "REFRIGERANTE",
    "brand": "COCA COLA",
    "type": "TRADICIONAL",
    "unity": "2L",
    "obs": "",
    "supermarkets": []
  }
}
```

response ```400```

```json
{
  "data": {
    "error": "all fields are required!"
  }
}
```

response ```404```

```json
{
  "data": {
    "error": "product not found!"
  }
}
```

response ```409```

```json
{
  "data": {
    "error": "product already exist!"
  }
}
```

---
---

## Usuário pode adicionar um produto existente a um supermercado – { OK }
**POST** ```/api/v1/supermarkets/:id/products```

body

```json
{
	"_id": { "$oid": "5ecc07f300706913001892ae" },
	"price": 229
}
```

response ```201```

```json
{
  "data": {
    "_id": {
      "$oid": "5ecd6155001cc81200ab45c4"
    },
    "fantasia": "HIPER NORTE",
    "cnpj": "24981871000100",
    "municipio": "PORANGATU",
    "uf": "GO",
    "bairro": "SETOR CENTRAL",
    "logradouro": "R 10 ESQ COM A 13",
    "numero": "SN",
    "cep": "76.550-000",
    "telefone": "(62) 3363-1124",
    "products": [
      {
        "_id": {
          "$oid": "5ecc07f300706913001892ae"
        },
        "description": "CREME DE LEITE PIRACANJUBA INTEGRAL 200G",
        "price": 229
      }
    ]
  }
}
```
response ```400```

```json
{
  "data": {
    "error": "all fields are required!"
  }
}
```

response ```404```

```json
{
  "data": {
    "error": "supermarket not found!"
  }
}
```

---
---

## Usuário pode atualizar o preço do produto de um supermercado – { OK }
**PUT** ```/api/v1/supermarkets/:id/products```

body

```json
{
	"_id": { "$oid": "5ecc07f300706913001892ae" },
	"price": 249
}
```

response ```200```

```json
{
  "data": {
    "_id": {
      "$oid": "5ecd6155001cc81200ab45c4"
    },
    "fantasia": "HIPER NORTE",
    "cnpj": "24981871000100",
    "municipio": "PORANGATU",
    "uf": "GO",
    "bairro": "SETOR CENTRAL",
    "logradouro": "R 10 ESQ COM A 13",
    "numero": "SN",
    "cep": "76.550-000",
    "telefone": "(62) 3363-1124",
    "products": [
      {
        "_id": {
          "$oid": "5ecc07f300706913001892ae"
        },
        "description": "CREME DE LEITE PIRACANJUBA INTEGRAL 200G",
        "price": 249
      }
    ]
  }
}
```
response ```400```

```json
{
  "data": {
    "error": "all fields are required!"
  }
}
```

response ```404```

```json
{
  "data": {
    "error": "supermarket not found!"
  }
}
```

---
---

## Usuário pode remover um produto existente de um supermercado – { OK }
**DELETE** ```/api/v1/supermarkets/:id/products```


```json
{
	"_id": { "$oid": "5ecc07f300706913001892ae" }
}
```

response ```200```

```json
{
  "data": {
    "_id": {
      "$oid": "5ecd6155001cc81200ab45c4"
    },
    "fantasia": "HIPER NORTE",
    "cnpj": "24981871000100",
    "municipio": "PORANGATU",
    "uf": "GO",
    "bairro": "SETOR CENTRAL",
    "logradouro": "R 10 ESQ COM A 13",
    "numero": "SN",
    "cep": "76.550-000",
    "telefone": "(62) 3363-1124",
    "products": []
  }
}
```

response ```400```

```json
{
  "data": {
    "error": "all fields are required!"
  }
}
```

response ```404```

```json
{
  "data": {
    "error": "supermarket not found!"
  }
}
```

---
---

[...]