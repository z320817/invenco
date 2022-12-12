# Invenco coding task

## How to run locally?

### Prerequisites
- Make sure you don't have containers or images named "backend", "mongo" or "mongo-express".
- Delete if any
- Make sure you have `docker` and `docker-compose` intalled on your machine, install if not.

### Work locally
- To start run `docker-compose up -d`
- To shut down and clean up run `docker-compose down --rmi all`

## Features implemented:
- CREATE, UPDATE and DELETE Employee
- GET list of Employees and Employee by ID
- User Authentication implemented (Admin user created with migration on application startup)
- To authenticate user POST `{ "email": "admin@invenco.com", "password": "1O@KSM!O@sk<Okspsj1pj39" }` to `/auth/login`
- JWT token resived has role = admin
- Only user with admin role are authorized to manipulate Employees
- Routes protection implemented, only regestered routes and actions allowed, all unused routes return 403 Forbidden
- Error handling midlleware implemented
- Mongo DB is used to store Employees and Admin user
- Mongo Express is used for convenience to check DB
- CI workflows implemented to test backend build and to run API integration tests