'use strict'

const morgan = require('morgan')

const fs = require('node:fs')

const now = new Date()
const today = now.toISOString().split('T')[0]

module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+'})
})

//This is a Node.js module that sets up a logging mechanism using the Morgan middleware. Morgan is a HTTP request logger middleware for Node.js applications.

// 1.'use strict' - This is a directive that enables strict mode in JavaScript. It helps to catch common coding mistakes and unsafe actions.
// 2.const morgan = require('morgan') - This line imports the Morgan middleware into the current module.
// 3. const fs = require('node:fs') - This line imports the built-in 'fs' module, which provides file system operations.
// 4.
// const now = new Data() - This line attempts to create a new instance of the 'Data' object.
// 5. const today = now.toISOString().split('T')[0] - This line converts the current date and time to a string in ISO 8601 format, then splits the string at the 'T' character to get the date part only.
// 6. module.exports = morgan('combined', { ... }) - This line exports the Morgan middleware with the 'combined' format and a custom stream.
// 7. stream: fs.createWriteStream(./logs/${ today }.log, { flags: 'a+' }) - This line creates a writable stream to a log file named after the current date.The { flags: 'a+' } option ensures that the stream appends new data to the end of the file if it already exists, or creates a new file if it doesn't.

// Overall, this code snippet sets up a logging mechanism using Morgan to log HTTP requests to a file named after the current date.