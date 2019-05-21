# BCO-Backend
## Running The Project

To run the project locally, `cd` into the repository and run `yarn`. This will install the needed dependencies. Next you can run either `yarn start` to run the server using node or `yarn server` to run the server using nodemon. The purpose of using nodemon is to restart the server any time you make a change and save. To run tests run `yarn test`. This will automatically set the knex config to testing using a dynamic environment variable.

**If you are running the project locally, every endpoint here is the same, but the heroku URL is replaced with `http://localhost:8080/`. For example, `GET` `http://localhost:8080/api/user` will return a user object.**

## Restrictions

If you would like to make a request to the user, cards, or events endpoint, a valid **JSON web token** is required in your request headers.authorization. This token is acquired by successfully registering an account or logging in.

## Description

This project is a RESTful API built using Node and Express. This project was build to provide a Backend for a business cards organizer web application. User registration, login, business card and event creation, deletion, fetching, or editing, are all handled here. This project was deployed on `Heroku`.

- The server is run using Node.
- Express is a minimalist Node web application framework for building APIs.
- PostgreSQL is the database used for production. SQLite3 was used for development and testing.
- Knex is a SQL query builder for JavaScript.
- Jsonwebtoken is used for authenticating users.
- Bcrypt is used for hashing passwords.
- Helmet adds a base layer of security by hiding basic info about the API when interacting with it.
- Dotenv allows the server to interact with environment variables.
- Cors is a dependency used to allow Cross Origin Resource Sharing. This allows the Frontend client to interact with the Backend.
- Cross-env allows the developer to set environment variables in a script.
- Jest is the library used for writing tests.
- Supertest is the dependency used for making "requests" in jest tests.

## Endpoints

### Log In and Registration

**POST** `https://business-cards-organizer-ls.herokuapp.com/api/auth/register` will create a new user and send back a token. Username, password, firstName, lastName are required fields.

**POST** `https://business-cards-organizer-ls.herokuapp.com/api/auth/login` will log the user in, and send back a token. Username and password required.

### User

- valid **JSON web token** is required in your request headers.authorization for every User endpoint

**GET** `https://business-cards-organizer-ls.herokuapp.com/api/user` will return user object.

**DEL** `https://business-cards-organizer-ls.herokuapp.com/api/user` will delete the user, and return the deleted object.

**PUT** `https://business-cards-organizer.herokuapp.com/api/user` will edit the user, and return the edited object. Edit fields can be just one or multiple(for example user can change password, or can change job title,password and email in one request);

### Cards




# Technical Design Document
https://docs.google.com/document/d/1XEsYhXc1svghKnFO9oLqpz7rCvH36GE4RSUzELUWwFg/view
