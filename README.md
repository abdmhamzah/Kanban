# Kanban

by Hamzah Abdullah Mubarak

An Simple Kanban Application with some features:
- Show list of created Task with 4 Category :
    - Backlog
    - Todo
    - Done 
    - Completed
- Create Task
- Change it's Progress
- Update created Task
- Delete created Task

Technology Used in this Project:
- Vue JS
- Express JS 
- Google Sign In OAuth
- SASS 
- Sequelize
- Postgres
- JSON Web Token
- Bcrypt
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
    "status": 200,
    "message": "Sign In User Successfull",
    "payload": {
        "token": < User Token >,
        "user": {
            "name": < User Name >,
            "email": < User Email >
        }
    }
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
    "status": 200,
    "message": "Sign In User Successfull",
    "payload": {
        "token": < User Token >,
        "user": {
            "name": < User Name >,
            "email": < User Email >
        }
    }
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
    "message": "New Task Succesfully Created",
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

## PUT/Tasks

`Update existing Task with new updated data`

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
    "message": "Task Succesfully Updated",
    "payload": {
        "id": < Task ID >,
        "title": < Task Title >,
        "description": < Task Description >,
        "category": < Task Category >,
        "UserId": < User ID >,
    }
}

Response(403):
{
    "statusCode": 403,
    "message": "You have no permit"
}

Response (404): 
{
    "statusCode": 404,
    "message": "Task not found"
}

Response (500):
{
    "messege": "Server Error"
}
```
-----

## DELETE/Tasks

`Delete existing Task`

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
    "message": "Task Succesfully Deleted",
    "payload": {
        "id": < Task ID >,
        "title": < Task Title >,
        "description": < Task Description >,
        "category": < Task Category >,
        "UserId": < User ID >,
    }
}

Response(403):
{
    "statusCode": 403,
    "message": "You have no permit"
}

Response (404): 
{
    "statusCode": 404,
    "message": "Task not found"
}

Response (500):
{
    "messege": "Server Error"
}
```
-----