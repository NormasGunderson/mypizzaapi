"use strict"  // Enable strict mode which helps catch common coding errors and unsafe actions

// Auth Controller:

const jwt = require('jsonwebtoken')  // Import the JSON Web Token library
const setToken = require('../../helpers/setToken')  // Import a helper function for setting tokens

const User = require('../../models/user')  // Import the User model

module.exports = {

    login: async (req, res) => {  // Define an asynchronous login function

        if (req.method == 'POST') {  // Check if the request method is POST

            const { username, password } = req.body  // Extract username and password from the request body

            if (username && password) {  // Check if both username and password are provided

                const user = await User.findOne({ username, password })  // Find a user with the provided username and password

                if (user) {  // Check if a user was found

                    if (user.isActive) {  // Check if the found user account is active

                        // Set Session:
                        req.session = {  // Create a new session object
                            user: {
                                id: user.id,  // Store user id in the session
                                username: user.username,  // Store username in the session
                                password: user.password,  // Store password in the session (not recommended for security reasons)
                                isAdmin: user.isAdmin  // Store admin status in the session
                            }
                        }

                        // Set Cookie:
                        if (req.body?.rememberMe) {  // Check if the rememberMe flag is set in the request body
                            // Set Cookie maxAge:
                            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 Days  // Set session cookie max age to 3 days
                        }

                        // Go to home:
                        res.redirect('/')  // Redirect to the home page

                    } else {

                        res.errorStatusCode = 401  // Set response status code to 401 (Unauthorized)
                        throw new Error('This account is not active.')  // Throw an error indicating the account is not active
                    }
                } else {

                    res.errorStatusCode = 401  // Set response status code to 401 (Unauthorized)
                    throw new Error('Wrong username or password.')  // Throw an error indicating incorrect username or password
                }
            } else {

                res.errorStatusCode = 401  // Set response status code to 401 (Unauthorized)
                throw new Error('Please enter username and password.')  // Throw an error indicating missing username or password
            }
        } else {

            res.render('userLoginForm')  // Render the login form for non-POST requests
        }
    },

    logout: async (req, res) => {  // Define an asynchronous logout function

        // Set session to null:
        req.session = null  // Clear the session object
        // Go to home:
        res.redirect('/')  // Redirect to the home page

    },
}

/*This code is an authentication controller for handling user login and logout in a Node.js application.It uses session management to keep track of the logged -in user and redirects users to the appropriate pages based on their actions and the status of their accounts.
*/