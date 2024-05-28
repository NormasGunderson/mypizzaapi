'use strict'

const express = require('express').Router();

const permission = require('../../middlewares/permissions')
const order = require('../../controllers/api/order')

router.use(permission.isLogin)

router.router('/')
    .get(order.list)
    .post(order.create)

router.route('/:id')
   .get(order.read)
   .put(order.update)
   .patch(order.update)
   .delete(permission.isAdmin, order.delete)

module.exports = router  

//This is part of a Node.js Express application's routing configuration for managing orders. It sets up routes for the '/order' endpoint and applies middleware for authentication and authorization.

// 1.
// The require statements import necessary modules:
// express: The Express framework for creating web applications.
// '../../middlewares/permissions': The middleware file for handling authentication and authorization.
// '../../controllers/api/order': The controller file for handling order - related operations.
// 2.
// router = require('express').Router(): Creates a new router object.Routers are used to define routes and handle HTTP requests.
// 3.
// router.use(permissions.isLogin): Applies the isLogin middleware to all routes defined in this router.The isLogin middleware checks if a user is authenticated before allowing access to the routes.
// 4.
// router.route('/'): Defines routes for the base '/order' URL.
// .get(order.list): Defines a GET route for '/order'.When a GET request is made to '/order', the list function from the order controller is called.
// .post(order.create): Defines a POST route for '/order'.When a POST request is made to '/order', the create function from the order controller is called.
// 5.
// router.route('/:id'): Defines routes for the '/order/:id' URL, where ':id' is a dynamic parameter representing the order ID.
// .get(order.read): Defines a GET route for '/order/:id'.When a GET request is made to '/order/:id', the read function from the order controller is called.
// .put(order.update): Defines a PUT route for '/order/:id'.When a PUT request is made to '/order/:id', the update function from the order controller is called.
// .patch(order.update): Defines a PATCH route for '/order/:id'.When a PATCH request is made to '/order/:id', the update function from the order controller is called.
// .delete(permissions.isAdmin, order.delete): Defines a DELETE route for '/order/:id'.When a DELETE request is made to '/order/:id', the isAdmin middleware is applied first.If the user is an admin, the delete function from the order controller is called.
// 6.
// module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.


// This code snippet demonstrates how to create routes for managing orders in a Node.js Express application, applying middleware for authentication and authorization, and using a controller to handle the logic.