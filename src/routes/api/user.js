'use strict'

const express = require('express').Router();

const permissions = require('../../middlewares/permissions');
const user = require('../../controllers/api/user')

Router.route('/')
.get(permissions.isAdmin, user.list)
.post(user.create)

router.router('/:id')
.get(permissions.isLogin, user.read)
.put(permissions.isLogin, user.update)
.patch(permissions.isLogin, user.update)
.delete(permissions.isAdmin, user.delete)

module.exports = router;


//The selected code snippet is part of a Node.js Express application's routing configuration for managing users. It sets up routes for the '/user' endpoint and applies middleware for authentication and authorization.

// 1.
// The require statements import necessary modules:
// express: The Express framework for creating web applications.
// '../../middlewares/permissions': The middleware file for handling authentication and authorization.
// '../../controllers/api/user': The controller file for handling user - related operations.
// 2.
// router = require('express').Router(): Creates a new router object.Routers are used to define routes and handle HTTP requests.
// 3.
// router.route('/'): Defines routes for the base '/user' URL.
// .get(permissions.isAdmin, user.list): Defines a GET route for '/user'.When a GET request is made to '/user', the isAdmin middleware is applied first.If the user is an admin, the list function from the user controller is called.
// .post(user.create): Defines a POST route for '/user'.When a POST request is made to '/user', the create function from the user controller is called.
// 4.
// router.route('/:id'): Defines routes for the '/user/:id' URL, where ':id' is a dynamic parameter representing the user ID.
// .get(permissions.isLogin, user.read): Defines a GET route for '/user/:id'.When a GET request is made to '/user/:id', the isLogin middleware is applied first.If the user is authenticated, the read function from the user controller is called.
// .put(permissions.isLogin, user.update): Defines a PUT route for '/user/:id'.When a PUT request is made to '/user/:id', the isLogin middleware is applied first.If the user is authenticated, the update function from the user controller is called.
// .patch(permissions.isLogin, user.update): Defines a PATCH route for '/user/:id'.When a PATCH request is made to '/user/:id', the isLogin middleware is applied first.If the user is authenticated, the update function from the user controller is called.
// .delete(permissions.isAdmin, user.delete): Defines a DELETE route for '/user/:id'.When a DELETE request is made to '/user/:id', the isAdmin middleware is applied first.If the user is an admin, the delete function from the user controller is called.
// 5.
// module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.


// This code snippet demonstrates how to create routes for managing users in a Node.js Express application, applying middleware for authentication and authorization, and using a controller to handle the logic.