"use strict"
/*{
  "userId": "652d7681508462fafafa01a2",
  "pizzaId": "652d76c5508462fafafa01b0",
  "size": "Small",
  "quantity": 1,
  "price": 99.99
}
*/
// Order Controller:

const Pizza = require('../../models/pizza')
const Order = require('../../models/order')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "List Orders"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        // const data = await res.getModelList(Order, {}, ['userId', 'pizzaId'])
        const data = await res.getModelList(Order, {}, [
            'userId',
            { path: 'pizzaId', populate: 'toppings' }
        ])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Order),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Create Order"
        */

        // Calculating:
        req.body.quantity = req.body?.quantity || 1 // default: 1
        if (!req.body?.price) {
            const dataPizza = await Pizza.findOne({ _id: req.body.pizzaId }, { _id: 0, price: 1 })
            req.body.price = dataPizza.price
        }
        req.body.totalPrice = req.body.price * req.body.quantity

        const data = await Order.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Get Single Order"
        */

        const data = await Order.findOne({ _id: req.params.id }).populate([
            'userId',
            { path: 'pizzaId', populate: 'toppings' }
        ])

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Update Order"
        */

        // Calculating:
        req.body.quantity = req.body?.quantity || 1 // default: 1
        if (!req.body?.price) {
            const dataOrder = await Order.findOne({ _id: req.params.id }, { _id: 0, price: 1 })
            req.body.price = dataOrder.price
        }
        req.body.totalPrice = req.body.price * req.body.quantity

        const data = await Order.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Order.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Delete Order"
        */

        const data = await Order.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}

//This is a Node.js Express.js controller for managing orders in a pizza delivery application. The controller includes functions for listing, creating, reading, updating, and deleting orders.
// 1. The controller begins with a JSON object representing a sample order.This object is not used in the controller logic but serves as a reference for the expected order data structure.
// 2. The controller requires the pizza and order models from the models directory.
// 3. The controller exports an object containing functions for each of the CRUD operations.
// 4. The list function retrieves a list of orders from the database.It uses the res.getModelList function to handle pagination, sorting, and searching.The function populates the userId and pizzaId fields with their respective data from the pizza model.
// 5.
// The create function creates a new order in the database.It calculates the totalPrice based on the price and quantity fields.If the price is not provided, it retrieves the price from the pizza model.
// 6.
// The read function retrieves a single order from the database based on the id parameter in the request.It populates the userId and pizzaId fields with their respective data from the pizza model.
// 7.
// The update function updates an existing order in the database based on the id parameter in the request.It calculates the totalPrice based on the price and quantity fields.If the price is not provided, it retrieves the price from the pizza model.
// 8.
// The delete function deletes an order from the database based on the id parameter in the request.It returns a status code of 204(No Content) if the order is successfully deleted, or a status code of 404(Not Found) if the order does not exist.


// Overall, the code provides a complete implementation of the order management functionality for a pizza delivery application using Node.js and Express.js.