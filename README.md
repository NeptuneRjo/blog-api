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

## Reflection

This was 1 / 2 of a project built as part of The Odin Project's NodeJS curriculum.
Project goals included using technologies learned up untill this point and familiarizing myself with the RESTful API building process.

The purpose of this project was to create a Nodejs API that allows users to access blog data.

One of the main challenges with this project was Authentication. Determining which Passportjs strategy would work best, configuring everything correctly
and making sure users can log in appropriately. I ran into some problems early on, as I had not correctly configured Express-CORS. This lead me
to spend a few days reading through the CORS documentation.

At the end of the day, the technologies implemented in this project are `Nodejs`, `Express`, `Express-Session`, `Passportjs-Local`, `Bcrypt`, and `MongoDb`.
I chose to use `Typescript`, mainly as a learning opportunity and as a way to minimize bugs.
