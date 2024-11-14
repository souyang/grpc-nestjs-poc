<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A [Nest](https://github.com/nestjs/nest) Microservice TypeScript repository on gRPC and Rest API Integration.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start auth
$ pnpm run start apigateway

# watch mode
$ pnpm run start:dev auth
$ pnpm run start:dev apigateway

# production mode
$ pnpm run start:prod auth
$ pnpm run start:prod apigateway
```

## API Documentation (Swagger)
Open browser, go to `[localhost:3000/](http://localhost:3000/api-docs)`

### API Documentation (Markdown)
<details>
<summary>View Here</summary>

---

# User Management API Documentation

This documentation provides details about the User Management API, which includes endpoints for creating, retrieving, updating, deleting users, and sending emails in batch.

---

## Base URL

- **Production**: `https://api.yourdomain.com/users`
- **Development**: `https://dev-api.yourdomain.com/users`

---

## Endpoints

### 1. Create a New User

- **Endpoint**: `POST /users`
- **Description**: Creates a new user.
- **Request Body**:
  
  ```json
  {
    "username": "string",
    "password": "string",
    "age": "integer"
  }
  ```

- **Responses**:
  - **201 Created**: User successfully created.
  - **400 Bad Request**: Validation error or missing required fields.

- **Example Request**:

  ```bash
  curl -X POST https://api.yourdomain.com/users \
    -H "Content-Type: application/json" \
    -d '{
          "username": "john_doe",
          "password": "password123",
          "age": 30
        }'
  ```

---

### 2. List Users with Pagination

- **Endpoint**: `POST /users/list`
- **Description**: Retrieves a paginated list of users.
- **Request Body**:
  
  ```json
  {
    "pagination": {
      "page": "integer",
      "limit": "integer",
      "sortFields": [
        {
          "field": "string",
          "order": "ASC|DESC"
        }
      ]
    }
  }
  ```

- **Responses**:
  - **200 OK**: Returns a list of users with pagination metadata.
  - **400 Bad Request**: Validation error or invalid pagination parameters.

- **Example Request**:

  ```bash
  curl -X POST https://api.yourdomain.com/users/list \
    -H "Content-Type: application/json" \
    -d '{
          "pagination": {
            "page": 1,
            "limit": 10,
            "sortFields": [
              {
                "field": "username",
                "order": "ASC"
              }
            ]
          }
        }'
  ```

---

### 3. Get User by ID

- **Endpoint**: `GET /users/{id}`
- **Description**: Fetches details of a user by ID.
- **Path Parameter**:
  - **id**: Unique identifier of the user.

- **Responses**:
  - **200 OK**: Returns user details.
  - **404 Not Found**: User not found.

- **Example Request**:

  ```bash
  curl -X GET https://api.yourdomain.com/users/12345
  ```

---

### 4. Update User

- **Endpoint**: `PATCH /users/{id}`
- **Description**: Updates user data by ID.
- **Path Parameter**:
  - **id**: Unique identifier of the user.
- **Request Body**:

  ```json
  {
    "updateFields": {
      "age": "integer",
      "subscribed": "boolean",
      "socialMedia": {
        "twitterUri": "string",
        "fbUri": "string",
        "extraData": {
          "key": "value"
        }
      },
      "password": "string"
    }
  }
  ```

- **Responses**:
  - **200 OK**: User successfully updated.
  - **400 Bad Request**: Validation error or invalid fields.
  - **404 Not Found**: User not found.

- **Example Request**:

  ```bash
  curl -X PATCH https://api.yourdomain.com/users/12345 \
    -H "Content-Type: application/json" \
    -d '{
          "updateFields": {
            "age": 31,
            "subscribed": true,
            "socialMedia": {
              "twitterUri": "https://twitter.com/johndoe",
              "fbUri": "https://facebook.com/johndoe"
            },
            "password": "newpassword123"
          }
        }'
  ```

---

### 5. Delete User

- **Endpoint**: `DELETE /users/{id}`
- **Description**: Deletes a user by ID.
- **Path Parameter**:
  - **id**: Unique identifier of the user.

- **Responses**:
  - **200 OK**: User successfully deleted.
  - **404 Not Found**: User not found.

- **Example Request**:

  ```bash
  curl -X DELETE https://api.yourdomain.com/users/12345
  ```

---

### 6. Email Users in Batch

- **Endpoint**: `POST /users/email`
- **Description**: Sends batch emails to all users.
- **Request Body**: No request body needed.

- **Responses**:
  - **200 OK**: Emails successfully queued/sent.
  - **500 Internal Server Error**: Error in email service.

- **Example Request**:

  ```bash
  curl -X POST https://api.yourdomain.com/users/email
  ```

---

## Data Models

### User Object

```json
{
  "id": "string",
  "username": "string",
  "age": "integer",
  "subscribed": "boolean",
  "socialMedia": {
    "twitterUri": "string",
    "fbUri": "string",
    "extraData": {
      "key": "value"
    }
  }
}
```

### Pagination Metadata

```json
{
  "totalItems": "integer",
  "totalPages": "integer",
  "currentPage": "integer",
  "itemsPerPage": "integer"
}
```

---

## Response Codes

- **200 OK**: The request was successful.
- **201 Created**: A new resource was successfully created.
- **400 Bad Request**: The request was invalid or cannot be served.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.
</details>

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
