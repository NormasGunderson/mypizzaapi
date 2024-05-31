"use strict"  // Enable strict mode which helps catch common coding errors and unsafe actions

/*------------------------------------------------------- 
{
  "userId": "652d7681508462fafafa01a2",
  "pizzaId": "652d76c5508462fafafa01b0",
  "size": "Small",
  "quantity": 1,
  "price": 99.99
}
------------------------------------------------------- */
// Order Controller:

const Pizza = require('../../models/pizza')  // Import the Pizza model
const Order = require('../../models/order')  // Import the Order model

const pizzaSizes = ['Small', 'Medium', 'Large', 'XLarge']  // Define available pizza sizes

module.exports = {

    list: async (req, res) => {  // Define an asynchronous function to list orders

        // only self-records:
        const filter = req.session?.user?.isAdmin ? {} : { userId: req.session.user.id }  // Set filter to show all orders for admins or only user's orders for regular users

        // const data = await res.getModelList(Order, {}, ['userId', 'pizzaId'])
        const data = await res.getModelList(Order, filter, [  // Get the list of orders with the specified filter and populate the pizzaId with toppings
            'userId',
            { path: 'pizzaId', populate: 'toppings' }
        ])

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Order),
        //     data
        // })

        // Add '?' parameters to url if there is not:
        if (!req.originalUrl.includes('?')) req.originalUrl += '?'  // Append '?' to the URL if not already present

        // console.log(data)
        res.render('orderList', {  // Render the order list view
            details: await res.getModelListDetails(Order, filter),  // Get additional details for the orders
            orders: data,  // Pass the order data to the view
            pageUrl: req.originalUrl.replace(/[?|&]page=([^&]+)/gi, ''),  // Remove page parameter from the URL
        })
    },

    create: async (req, res) => {  // Define an asynchronous function to create a new order

        if (req.method == 'POST') {  // Check if the request method is POST

            // Add userId from session:
            req.body.userId = req.session.user.id  // Add userId to the request body from session
            // Add pizzaId from req.query:
            req.body.pizzaId = req.query.pizza  // Add pizzaId to the request body from query parameter

            // Calculatings:
            req.body.quantity = req.body?.quantity || 1 // default: 1  // Set quantity to 1 if not provided
            if (!req.body?.price) {  // If price is not provided
                const dataPizza = await Pizza.findOne({ _id: req.body.pizzaId }, { _id: 0, price: 1 })  // Find the price of the selected pizza
                req.body.price = dataPizza.price  // Set the price in the request body
            }
            req.body.totalPrice = req.body.price * req.body.quantity  // Calculate the total price

            const data = await Order.create(req.body)  // Create a new order with the request body

            // res.status(201).send({
            //     error: false,
            //     data
            // })

            res.redirect('/orders/' + data.id)  // Redirect to the order detail page

        } else {

            res.render('orderForm', {  // Render the order form view
                order: null,  // No existing order data
                pizzas: null,  // No list of pizzas
                pizza: await Pizza.findOne({ _id: req.query.pizza }),  // Get the selected pizza data
                pizzaSizes,  // Pass the available pizza sizes to the view
            })
        }
    },

    read: async (req, res) => {  // Define an asynchronous function to read an order

        const data = await Order.findOne({ _id: req.params.id }).populate([  // Find the order by ID and populate related fields
            'userId',
            { path: 'pizzaId', populate: 'toppings' }
        ])

        // res.status(200).send({
        //     error: false,
        //     data
        // })

        res.render('orderRead', {  // Render the order detail view
            order: data,  // Pass the order data to the view
        })

    },

    update: async (req, res) => {  // Define an asynchronous function to update an order

        if (req.method == 'POST') {  // Check if the request method is POST

            // Calculatings:
            req.body.quantity = req.body?.quantity || 1 // default: 1  // Set quantity to 1 if not provided
            if (!req.body?.price) {  // If price is not provided
                const dataOrder = await Order.findOne({ _id: req.params.id }, { _id: 0, price: 1 })  // Find the price of the order
                req.body.price = dataOrder.price  // Set the price in the request body
            }
            req.body.totalPrice = req.body.price * req.body.quantity  // Calculate the total price

            console.log(req.body)

            const data = await Order.updateOne({ _id: req.params.id }, req.body, { runValidators: true })  // Update the order with the new data

            // res.status(202).send({
            //     error: false,
            //     data,
            //     new: await Order.findOne({ _id: req.params.id })
            // })

            res.redirect('/orders/' + req.params.id)  // Redirect to the order detail page

        } else {

            console.log(await Order.findOne({ _id: req.params.id }))
            res.render('orderForm', {  // Render the order form view
                order: await Order.findOne({ _id: req.params.id }),  // Pass the existing order data to the view
                pizzas: await Pizza.find(),  // Get the list of all pizzas
                pizzaSizes,  // Pass the available pizza sizes to the view
            })
        }

    },

    delete: async (req, res) => {  // Define an asynchronous function to delete an order

        const data = await Order.deleteOne({ _id: req.params.id })  // Delete the order by ID

        // Go to home:
        res.redirect('/orders')  // Redirect to the orders list page

    },
}
