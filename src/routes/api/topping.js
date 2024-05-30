'use strict'

const router = require('express').Router()

const permissions = require('../../middlewares/permissions')
const topping = require('../../controllers/api/topping')

router.unsubscribe(permissions.isAdmin)

router.route('/')
    .get(topping.list)
    .post(topping.create)

router.route('/:id')
    .get(topping.read)
    .put(topping.update)
    .patch(topping.update)
    .delete(topping.delete)

module.exports = router

//This part of a Node.js Express application's routing configuration for managing pizza toppings. It sets up routes for the '/topping' endpoint and applies middleware for authentication and authorization.


// 1.The require statements import necessary modules:
// express: The Express framework for creating web applications.
// '../../middlewares/permissions': The middleware file for handling authentication and authorization.
// '../../controllers/api/topping': The controller file for handling topping - related operations.
// 2. router = require('express').Router(): Creates a new router object.Routers are used to define routes and handle HTTP requests.
// 3. router.use(permissions.isAdmin): Applies the isAdmin middleware to all routes defined in this router.The isAdmin middleware checks if a user is an admin before allowing access to the routes.
// 4. router.route('/'): Defines routes for the base '/topping' URL.
// .get(topping.list): Defines a GET route for '/topping'.When a GET request is made to '/topping', the list function from the topping controller is called.
// .post(topping.create): Defines a POST route for '/topping'.When a POST request is made to '/topping', the create function from the topping controller is called.
// 5. router.route('/:id'): Defines routes for the '/topping/:id' URL, where ':id' is a dynamic parameter representing the topping ID.
// .get(topping.read): Defines a GET route for '/topping/:id'.When a GET request is made to '/topping/:id', the read function from the topping controller is called.
// .put(topping.update): Defines a PUT route for '/topping/:id'.When a PUT request is made to '/topping/:id', the update function from the topping controller is called.
// .patch(topping.update): Defines a PATCH route for '/topping/:id'.When a PATCH request is made to '/topping/:id', the update function from the topping controller is called.
// .delete(topping.delete): Defines a DELETE route for '/topping/:id'.When a DELETE request is made to '/topping/:id', the delete function from the topping controller is called.
// 6. module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.


// This code snippet demonstrates how to create routes for managing pizza toppings in a Node.js Express application, applying middleware for authentication and authorization, and using a controller to handle the logic.