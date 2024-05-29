'use strict'

const router = require('express').Router()

const permissions = require('../../middlewares/permissions')

router.all('/', permissions.isAdmin, user.list)
router.all('/create', user.create)
router.all('/:id', permission.isLogin, user.read)
router.all('/:id/update', permissions.isLogin, users.update)
router.all('/:id/delete', permissions.isAdmin, user.delete)

module.exports = router

//This is part of a Node.js Express application's routing configuration for managing user views. It sets up routes for the '/user' endpoint and applies middleware for authentication and authorization.

// 1.The require statements import necessary modules:
// express: The Express framework for creating web applications.
// '../../middlewares/permissions': The middleware file for handling authentication and authorization.
// '../../controllers/view/user': The controller file for handling user - related operations in the view layer.
// 2. router = require('express').Router(): Creates a new router object.Routers are used to define routes and handle HTTP requests.
// 3. router.all('/', permissions.isAdmin, user.list): Defines a route for the base '/user' URL.The all method is used to match all HTTP methods(GET, POST, PUT, DELETE, etc.).The isAdmin middleware is applied first.If the user is an admin, the list function from the user controller is called.
// 4. router.all('/create', user.create): Defines a route for '/user/create'.The all method is used to match all HTTP methods.The create function from the user controller is called.
// 5. router.all('/:id', permissions.isLogin, user.read): Defines a route for '/user/:id', where ':id' is a dynamic parameter representing the user ID.The all method is used to match all HTTP methods.The isLogin middleware is applied first.If the user is authenticated, the read function from the user controller is called.
// 6. router.all('/:id/update', permissions.isLogin, user.update): Defines a route for '/user/:id/update', where ':id' is a dynamic parameter representing the user ID.The all method is used to match all HTTP methods.The isLogin middleware is applied first.If the user is authenticated, the update function from the user controller is called.
// 7. router.all('/:id/delete', permissions.isAdmin, user.delete): Defines a route for '/user/:id/delete', where ':id' is a dynamic parameter representing the user ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the delete function from the user controller is called.
// 8. module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.


// This code snippet demonstrates how to create routes for managing user views in a Node.js Express application, applying middleware for authentication and authorization, and using a controller to handle the logic.