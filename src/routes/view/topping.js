'use strict'

const router = require('express').Router
const permissions = require('../../controllers/view/topping')

router.all('/', permissions.isAdmin, topping.list)
router.all('/create', permissions.isAdmin, topping.create)
router.all('/:id', permissions.isAdmin, topping.read)
router.all('/:id/update', permissions.isAdmin, topping.update)
router.all('/:id/delete', permissions.isAdmin, topping.delete)

module.exports = router

//The selected code snippet is part of a Node.js Express application's routing configuration for managing pizza topping views. It sets up routes for the '/topping' endpoint and applies middleware for authentication and authorization.
// 1.
// The require statements import necessary modules:
// express: The Express framework for creating web applications.
// '../../middlewares/permissions': The middleware file for handling authentication and authorization.
// '../../controllers/view/topping': The controller file for handling topping - related operations in the view layer.
// 2.
// router = require('express').Router(): Creates a new router object.Routers are used to define routes and handle HTTP requests.
// 3.
// router.all('/', permissions.isAdmin, topping.list): Defines a route for the base '/topping' URL.The all method is used to match all HTTP methods(GET, POST, PUT, DELETE, etc.).The isAdmin middleware is applied first.If the user is an admin, the list function from the topping controller is called.
// 4.
// router.all('/create', permissions.isAdmin, topping.create): Defines a route for '/topping/create'.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the create function from the topping controller is called.
// 5.
// router.all('/:id', permissions.isAdmin, topping.read): Defines a route for '/topping/:id', where ':id' is a dynamic parameter representing the topping ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the read function from the topping controller is called.
// 6.
// router.all('/:id/update', permissions.isAdmin, topping.update): Defines a route for '/topping/:id/update', where ':id' is a dynamic parameter representing the topping ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the update function from the topping controller is called.
// 7.
// router.all('/:id/delete', permissions.isAdmin, topping.delete): Defines a route for '/topping/:id/delete', where ':id' is a dynamic parameter representing the topping ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the delete function from the topping controller is called.
// 8.
// module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.


// This code snippet demonstrates how to create routes for managing pizza topping views in a Node.js Express application, applying middleware for authentication and authorization, and using a controller to handle the logic.It also includes routes for creating, reading, updating, and deleting toppings.