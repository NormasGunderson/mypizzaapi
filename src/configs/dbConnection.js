'use strict'
//MongoDB connection:

const mongoose = require('mongoose')

const dbConnection = function() {

    mongoose.connect(process.env.MONGODB)
    .then(() => console.log('DB Connected for pizza api'))
    .catch((err) => console.log(' DB Not Connected ', err))
}

module.exports = {
    mongoose, 
    dbConnection
}


//The selected code snippet is a JavaScript module that establishes a connection to a MongoDB database using the Mongoose library. Here's a breakdown of the code:

// 1. 'use strict' is a directive that enables strict mode in JavaScript, which helps catch common coding mistakes and unsafe actions.
// 2. const mongoose = require('mongoose') imports the Mongoose library, which provides a MongoDB object modeling tool designed to work in an asynchronous environment.
// 3. const dbConnection = function () {... } defines a function named dbConnection.This function will be used to establish the database connection.
// 4. Inside the dbConnection function, mongoose.connect(process.env.MONGODB) attempts to connect to the MongoDB database using the connection string stored in the MONGODB environment variable.
// 5. The.then(() => console.log('DB Connected for pizza api')) part of the code is a promise that will be executed if the connection is successful.It logs a success message to the console.
// 6. The.catch((err) => console.log(' DB Not Connected ', err)) part of the code is another promise that will be executed if the connection fails.It logs an error message to the console along with the error details.
// 7. Finally, module.exports = { mongoose, dbConnection } exports the mongoose object and the dbConnection function from this module, making them accessible to other parts of the application.


// This code snippet is a fundamental part of a Node.js application that interacts with a MongoDB database using Mongoose.It ensures that the application can establish a connection to the database and handle any connection errors.