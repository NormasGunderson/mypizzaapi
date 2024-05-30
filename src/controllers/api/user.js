'use strict'

// User Controller:

const User = require('../../models/user')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
        */

        const data = await User.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

        const data = await User.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
        */

        const data = await User.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        const data = await User.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}




//This file is a Node.js Express.js controller for managing user data in a pizza delivery application. The controller includes functions for listing, creating, reading, updating, and deleting users.

// 1. The controller begins by requiring the user model from the models directory.
// 2. The controller exports an object containing functions for each of the CRUD operations.
// 3.
// The list function retrieves a list of users from the database.It uses the res.getModelList function to handle pagination, sorting, searching, and other query parameters.
// 4.
// The create function creates a new user in the database.
// 5.
// The read function retrieves a single user from the database based on the id parameter in the request.
// 6.
// The update function updates an existing user in the database based on the id parameter in the request.
// 7.
// The delete function deletes a user from the database based on the id parameter in the request.


// These functions provide a complete implementation of the user management functionality for a pizza delivery application using Node.js and Express.js.
