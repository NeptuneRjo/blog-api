## Blog Api (Backend)

Blog API is a NodeJS application that allows users to create, read, update, and delete blogs
depending on their role.

## Installation and Setup

- Clone or download the reprository
- Run `npm install` once you've accessed the project on your machine to install all of the dependencies

### Before starting the app, you will need to create some `env` variables.

- `MONGO_URI` This is you mongodb connection string
- `WEB_SECRET` and `EXPRESS_SECRET` These can be random strings of your choice

- Once the dependencies are installed, simply run `node dist/server.js` or if you have nodemon `nodemon dist/server.js`
- By default, the app can be accessed from `http://localhost:4000`
- If you make any changes to the application, you can use `tsc --w` to compile the Typescript automatically to the dist/ directory

## Testing the application

Here are the instructions to start the test server

- If you have an instance of Blog API running, close it OR simply change the port to something other than 4000
- Run `node dist/tests/fixtures/testServer.js` or use `nodemon` with the same directory
- Begin testing!
