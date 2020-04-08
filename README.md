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
    "name": < New User Names >,
    "email": < New User Emails >,
    "password": < New User Passwords >,
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

## GET/Tasks

`Get all Tasks`

- _Request Header_
```
{
    "token": < User Token >
}
```

- _Request Body_
```
Empty
```

- _Response_
```
Response (200):
{
    "statusCode": 200,
    "message": "Succesfully show all tasks",
    "payload": [
        {
            "id": < Task ID >,
            "title": < Task Title >,
            "description": < Task Description >,
            "category": < Task Category >,
            "UserId": < User ID >,
            "User": {
                "id": < User ID >,
                "name": < User Name >,
                "email": < Email >,
                "password": < Hashed Password >>,
                "organization": < User Organization >,
            }
        }
    ]
}

Response (404): 
{
    "statusCode": 404,
    "message": "Token not found"
}

Response (500):
{
    "messege": "Server Error"
}
```
-----

## POST/Tasks

`Add new Task`

- _Request Header_
```
{
    "token": < User Token >
}
```

- _Request Body_
```
{
    "title": < Task Title >,
    "description": < Task Description >,
    "category": < Task Category >,
}
```

- _Response_
```
Response (200):
{
    "statusCode": 200,
    "message": "New Task Created Succesfully",
    "payload": {
        "id": < Task ID >,
        "title": < Task Title >,
        "description": < Task Description >,
        "category": < Task Category >,
        "UserId": < User ID >,
    }
}

Response (400): 
{
    "statusCode": 400,
    "message": "Please Insert Task & Description"
}

Response (404): 
{
    "statusCode": 404,
    "message": "Token not found"
}

Response (500):
{
    "messege": "Server Error"
}
```
-----