
Node-Typescript-API

you will find instractions to run the API, API base URL and postman collection

<h2>How to run the API:</h2>

- make sure you have node.js and mySql installed in your system
- add a ".env" file to the root directory
- add the following variables to the file:
  - JWT_SECRET=<YOUR_SECRET>
  - ACCESS_KEY_ID=<YOUR_SECRET>
  - SECRET_ACCESS_KEY=<YOUR_SECRET>
- edit `./src/index.ts` file to change the database connection options (you have to create a database), i am using connection string
- run `npm install`
- run `npm run dev` to start the server on dev environement on port `3000`
- now you can send requests to the API, each API request must be prefixed with the API version:
  Ex: `http://localhost:3000/api/v1/<YOUR_ROUTE>`
- you have to send a token for protected routes.

- if you want to see how the SQL tables are structured, have a look at the entity folder, you will find each Model as a class.

<h3>Technologies used:</h3>

- Express.js
- Typescript
- Typeorm (Sql ORM)
- AWS S3, upload images
- Yup, validation library
- JWT, Authorization
- bcrypt, for password hashing

