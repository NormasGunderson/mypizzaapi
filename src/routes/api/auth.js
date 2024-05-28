'use strict'
const router = require('router').Router()
const auth = require('../../controllers/api/auth')

const router = require('../../controllers/api/auth')

router.post('/login', auth.login)
router.port('/refresh', auth.refresh)
router.get('/logout', auth.logout)

module.exports = router


//This is part of a Node.js Express application's routing configuration. It sets up routes for the '/auth' endpoint, which is responsible for user authentication.
// 1. router = require('express').Router(): Creates a new router object.
// express: The Express framework for creating web applications.Routers are used to define routes and handle HTTP requests.
// 2.The require statements import necessary modules:
// const auth = require('../../controllers/api/auth'): Imports the authentication controller, which contains the logic for handling login, refresh, and logout operations.
// 3. router.post('/login', auth.login): Defines a POST route for '/login'.When a POST request is made to '/auth/login', the login function from the auth controller is called.
// 4. router.post('/refresh', auth.refresh): Defines a POST route for '/refresh'.When a POST request is made to '/auth/refresh', the refresh function from the auth controller is called.
// 5. router.get('/logout', auth.logout): Defines a GET route for '/logout'.When a GET request is made to '/auth/logout', the logout function from the auth controller is called.
// 6. module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.

// This code demonstrates how to create routes for user authentication in a Node.js Express application using a controller to handle the logic.