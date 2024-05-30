'use strict'

const router = require('express').Router();

const permissions = require('../../middlewares/permissions')
const pizza = require('../../controllers/api/pizza')

router.route('/')
    .get(pizza.list)
    .post(permissions.isAdmin, pizza.create)

router.route('/:id')
    .get(pizza.read)
    .put(permissions.isAdmin, pizza.update)
    .patch(permissions.isAdmin, pizza.update)
    .delete(permissions.isAdmin, pizza.delete)

router.put('/:is/pushToppings', permissions.isAdmin, pizza.pushToppings)
router.put('/:id/pullToppings', permissions.isAdmin, pizza.pullToppings)

module.exports = router;

//This is part of a Node.js Express application's routing configuration for managing pizzas. It sets up routes for the '/pizza' endpoint and applies middleware for authentication and authorization.


// 1.The require statements import necessary modules:
// express: The Express framework for creating web applications.
// '../../middlewares/permissions': The middleware file for handling authentication and authorization.
// '../../controllers/api/pizza': The controller file for handling pizza - related operations.
// 2. router = require('express').Router(): Creates a new router object.Routers are used to define routes and handle HTTP requests.
// 3. router.route('/'): Defines routes for the base '/pizza' URL.
// .get(pizza.list): Defines a GET route for '/pizza'.When a GET request is made to '/pizza', the list function from the pizza controller is called.
// .post(permissions.isAdmin, pizza.create): Defines a POST route for '/pizza'.When a POST request is made to '/pizza', the isAdmin middleware is applied first.If the user is an admin, the create function from the pizza controller is called.
// 4. router.route('/:id'): Defines routes for the '/pizza/:id' URL, where ':id' is a dynamic parameter representing the pizza ID.
// .get(pizza.read): Defines a GET route for '/pizza/:id'.When a GET request is made to '/pizza/:id', the read function from the pizza controller is called.
// .put(permissions.isAdmin, pizza.update): Defines a PUT route for '/pizza/:id'.When a PUT request is made to '/pizza/:id', the isAdmin middleware is applied first.If the user is an admin, the update function from the pizza controller is called.
// .patch(permissions.isAdmin, pizza.update): Defines a PATCH route for '/pizza/:id'.When a PATCH request is made to '/pizza/:id', the isAdmin middleware is applied first.If the user is an admin, the update function from the pizza controller is called.
// .delete(permissions.isAdmin, pizza.delete): Defines a DELETE route for '/pizza/:id'.When a DELETE request is made to '/pizza/:id', the isAdmin middleware is applied first.If the user is an admin, the delete function from the pizza controller is called.
// 5.router.put('/:id/pushToppings', permissions.isAdmin, pizza.pushToppings): Defines a PUT route for '/pizza/:id/pushToppings'.When a PUT request is made to '/pizza/:id/pushToppings', the isAdmin middleware is applied first.If the user is an admin, the pushToppings function from the pizza controller is called.
// 6. router.put('/:id/pullToppings', permissions.isAdmin, pizza.pullToppings): Defines a PUT route for '/pizza/:id/pullToppings'.When a PUT request is made to '/pizza/:id/pullToppings', the isAdmin middleware is applied first.If the user is an admin, the pullToppings function from the pizza controller is called.
// 7. module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.


// This code snippet demonstrates how to create routes for managing pizzas in a Node.js Express application, applying middleware for authentication and authorization, and using a controller to handle the logic.It also includes additional routes for managing pizza toppings.