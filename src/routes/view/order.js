'use strict'

const router = require('express').Router()

const permissions = require('../../middlewares/permissions')
const order = require('../../middlewares/view/order')

router.all('/', permissions.isLogin, order.list)
router.all('./create', permissions.isLogin, order.create)
router.all('/:id', permissions.isLogin, order.read)
router.all('/:id/update', permissions.isLogin, order.update)
router.all('/:id/delete', permissions.isAdmin, order.delete)

module.exports = router;


//The selected code snippet is part of a Node.js Express application's routing configuration for managing order views. It sets up routes for the '/order' endpoint and applies middleware for authentication and authorization.

// 1.
// The require statements import necessary modules:
// express: The Express framework for creating web applications.
// '../../middlewares/permissions': The middleware file for handling authentication and authorization.
// '../../controllers/view/order': The controller file for handling order - related operations in the view layer.
// 2.
// router = require('express').Router(): Creates a new router object.Routers are used to define routes and handle HTTP requests.
// 3.
// router.all('/', permissions.isLogin, order.list): Defines a route for the base '/order' URL.The all method is used to match all HTTP methods(GET, POST, PUT, DELETE, etc.).The isLogin middleware is applied first.If the user is authenticated, the list function from the order controller is called.
// 4.
// router.all('/create', permissions.isLogin, order.create): Defines a route for '/order/create'.The all method is used to match all HTTP methods.The isLogin middleware is applied first.If the user is authenticated, the create function from the order controller is called.
// 5.
// router.all('/:id', permissions.isLogin, order.read): Defines a route for '/order/:id', where ':id' is a dynamic parameter representing the order ID.The all method is used to match all HTTP methods.The isLogin middleware is applied first.If the user is authenticated, the read function from the order controller is called.
// 6.
// router.all('/:id/update', permissions.isLogin, order.update): Defines a route for '/order/:id/update', where ':id' is a dynamic parameter representing the order ID.The all method is used to match all HTTP methods.The isLogin middleware is applied first.If the user is authenticated, the update function from the order controller is called.
// 7.
// router.all('/:id/delete', permissions.isAdmin, order.delete): Defines a route for '/order/:id/delete', where ':id' is a dynamic parameter representing the order ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the delete function from the order controller is called.
// 8.
// module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.


// This code snippet demonstrates how to create routes for managing order views in a Node.js Express application, applying middleware for authentication and authorization, and using a controller to handle the logic.It also includes routes for creating, reading, updating, and deleting orders.
