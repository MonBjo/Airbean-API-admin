# Airbean-API---Bunny-Scientists

## Debug in insomnia:

---
**`POST` localhost:8000/api/account/signup**

Body:    
json       
```json
{
    "username":"William2",
    "email":"william@hotmaail.se",
    "password":"pw65123"
}
```

Header:   
Content-Type | application/json

---
**`POST` localhost:8000/api/order**

Body:     
json        
```json
{"cart": [
    {"id": "2",
    "title": "Caffè Doppio",
    "price": 49,
    "amount": 1},
{
  "id": 3,
  "title": "Cappuccino",
  "price": 49,
  "amount": 2}
]}
```

Header:      
username | William2     
Content-Type | application/json

---
**`GET` localhost:8000/api/account/orderhistory**

Body:         
*no body*

Header:   
username | William2     

---
**localhost:8000/api/menu**

Body:       
*no body*

Header:        
*no header*

---
**`POST` localhost:8000/api/account/login**

Body:       
json                 
```json
{
  "username":"William2",
  "password":"pw65123"
}
```

Header:        
*no header*

---
ADMIN STUFF
---
**`POST` localhost:8000/api/admin/addproduct**

Body:       
json            
```json
{
  "id": 7,
	"title": "BryggKaffe ++",
	"desc": "Bryggd på dagens bönor.",
	"price": 54
}
```

Header:        
Content-Type | application/json           
key | Owi0G2kUd6G9NJQlbvgg

---
**`DELETE` localhost:8000/api/admin/removeproduct**

Body:       
json         
```json
{
	"title": "BryggKaffe ++"
}
```

Header:        
Content-Type | application/json           
key | Owi0G2kUd6G9NJQlbvgg
