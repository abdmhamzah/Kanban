# Kanban

by Hamzah Abdullah Mubarak

An Simple Todo Application with some features:
- Created Todo
- Show List of created Todos
- Show created Todo with specific ID
- Update created Todo
- Delete Todo

Technology Used in this Project:
- Vue JS
- Express JS 
- Google Sign In OAuth
- SASS 
- Sequelize
- Postgres
- JSON Web Token
- Bcrypt
- Ajax
- Axios


## POST/Signup

`Add new data of User`

- _Request Header_
```
Empty
```

- _Request Body_
```
{
    "name": < User Name >,
    "email": < User Email >,
    "password": < User Password >,
}
```

- _Response_
```
Response (200):
{
    "statusCode": 200,
    "message": "Sign Up User Successfull",
    "payload": {
        "id": < User ID >,
        "name": < User Name >,
        "email": < User Email >,
        "password": < Hashed User Password >,
        "organization": "Hacktiv8 Indonesia"
    }
}

Response (400): 
{
    "messege": "Invalid Username / Password, Please try again"
}

Response (500):
{
    "messege": "Server Error"
}
```
-----

## POST/Signin

`Authentication user Data`

- _Request Header_
```
Empty
```

- _Request Body_
```
{
    "email": < User Email >,
    "password": < User Password >,
}
```

- _Response_
```
Response (200):
{
    "token": < User Token >
}

Response (400): 
{
    "messege": "Invalid Username / Password, Please try again"
}

Response (404): 
{
    "messege": "User not found, please register yourself"
}

Response (500):
{
    "messege": "Server Error"
}
```
-----

## POST/Signin-Google

`Authentication user Data`

- _Request Header_
```
Empty
```

- _Request Body_
```
{
    "email": < User Email >,
    "password": < User Password >,
}
```

- _Response_
```
Response (200):
{
    "token": < User Token >
}

Response (400): 
{
    "messege": "Invalid Username / Password, Please try again"
}

Response (404): 
{
    "messege": "User not found, please register yourself"
}

Response (500):
{
    "messege": "Server Error"
}
```
-----