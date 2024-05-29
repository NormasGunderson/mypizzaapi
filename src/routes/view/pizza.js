'use strict'

const router = require('express').Router()

const permissions = require('../../middlewares/permissions')
const pizza = require('../../middlewares/view/pizza')

router.all('/', pizza.list)
router.all('./create', permissions.isAdmin, pizza.create)


router.all('/:id', permissions.isAdmin, pizza.read)
router.all('/:id/update', permissions.isAdmin, pizza.update)
router.all('/:id/delete', permissions.isAdmin, pizza.delete)

router.all('/:id/pushToppings', permissions.isAdmin, pizza.pushToppings)
router.all('/:id/pullToppings', permissions.isAdmin, pizza.pullToppings)

module.exports = router;

//The selected code snippet is part of a Node.js Express application's routing configuration for managing pizza views. It sets up routes for the '/pizza' endpoint and applies middleware for authentication and authorization.
// 1.
// The require statements import necessary modules:
// express: The Express framework for creating web applications.
// '../../middlewares/permissions': The middleware file for handling authentication and authorization.
// '../../controllers/view/pizza': The controller file for handling pizza - related operations in the view layer.
// 2.
// router = require('express').Router(): Creates a new router object.Routers are used to define routes and handle HTTP requests.
// 3.
// router.all('/', pizza.list): Defines a route for the base '/pizza' URL.The all method is used to match all HTTP methods(GET, POST, PUT, DELETE, etc.).The list function from the pizza controller is called.
// 4.
// router.all('/create', permissions.isAdmin, pizza.create): Defines a route for '/pizza/create'.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the create function from the pizza controller is called.
// 5.
// router.all('/:id', permissions.isAdmin, pizza.read): Defines a route for '/pizza/:id', where ':id' is a dynamic parameter representing the pizza ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the read function from the pizza controller is called.
// 6.
// router.all('/:id/update', permissions.isAdmin, pizza.update): Defines a route for '/pizza/:id/update', where ':id' is a dynamic parameter representing the pizza ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the update function from the pizza controller is called.
// 7.
// router.all('/:id/delete', permissions.isAdmin, pizza.delete): Defines a route for '/pizza/:id/delete', where ':id' is a dynamic parameter representing the pizza ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the delete function from the pizza controller is called.
// 8.
// router.all('/:id/pushToppings', permissions.isAdmin, pizza.pushToppings): Defines a route for '/pizza/:id/pushToppings', where ':id' is a dynamic parameter representing the pizza ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the pushToppings function from the pizza controller is called.
// 9.
// router.all('/:id/pullToppings', permissions.isAdmin, pizza.pullToppings): Defines a route for '/pizza/:id/pullToppings', where ':id' is a dynamic parameter representing the pizza ID.The all method is used to match all HTTP methods.The isAdmin middleware is applied first.If the user is an admin, the pullToppings function from the pizza controller is called.
// 10.
// module.exports = router: Exports the router object, allowing it to be imported and used in other parts of the application.


// This code snippet demonstrates how to create routes for managing pizza views in a Node.js Express application, applying middleware for authentication and authorization, and using a controller to handle the logic.It also includes routes for creating, reading, updating, deleting, and managing pizza toppings.