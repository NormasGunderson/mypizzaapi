'use strict'
// Topping Controller:

const Topping = require('../../models/topping')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "List Toppings"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Topping)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Topping),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "Create Topping"
        */

        const data = await Topping.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "Get Single Topping"
        */

        const data = await Topping.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "Update Topping"
        */

        const data = await Topping.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Topping.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Toppings"]
            #swagger.summary = "Delete Topping"
        */

        const data = await Topping.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}



//This is a Node.js Express.js controller for managing topping data in a pizza delivery application. The controller includes functions for listing, creating, reading, updating, and deleting toppings.

// 1.
// The controller begins by requiring the topping model from the models directory.
// 2.
// The controller exports an object containing functions for each of the CRUD operations.
// 3.
// The list function retrieves a list of toppings from the database.It uses the res.getModelList function to handle pagination, sorting, searching, and other query parameters.
// 4.
// The create function creates a new topping in the database.
// 5.
// The read function retrieves a single topping from the database based on the id parameter in the request.
// 6.
// The update function updates an existing topping in the database based on the id parameter in the request.
// 7.
// The delete function deletes a topping from the database based on the id parameter in the request.


// These functions provide a complete implementation of the topping management functionality for a pizza delivery application using Node.js and Express.js.