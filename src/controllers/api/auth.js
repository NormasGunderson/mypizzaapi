"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const jwt = require('jsonwebtoken')
const setToken = require('../../helpers/setToken')

const User = require('../../models/user')

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            _swagger.deprecated = true
            _swagger.ignore = true
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'test',
                    password: '1234'
                }
            }
        */

        const { username, password } = req.body

        if (username && password) {

            const user = await User.findOne({ username, password })

            if (user) {

                if (user.isActive) {

                    // res.send({
                    //     error: false,
                    //     token: {
                    //         access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '10m' }),
                    //         refresh: jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '3d' }),
                    //     }
                    // })

                    // const data = {
                    //     access: user.toJSON(),
                    //     refresh: { _id: user._id, password: user.password },
                    //     shortExpiresIn: '10m',
                    //     longExpiresIn: '3d'
                    // }

                    // res.send({
                    //     error: false,
                    //     token: {
                    //         access: jwt.sign(data.access, process.env.ACCESS_KEY, { expiresIn: data.shortExpiresIn }),
                    //         refresh: jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.longExpiresIn }),
                    //     }
                    // })

                    res.send({
                        error: false,
                        token: setToken(user),
                    })

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }
    },


    refresh: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Token Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    token: {
                        refresh: '...refreshToken...'
                    }
                }
            }
            */
           
           const refreshToken = req.body?.token?.refresh
           /* how the previews line work with optional chaining operator ?.
           req.body is an object. If req.body is null or undefined, the entire expression evaluates to undefined.
           Otherwise, it checks if req.body.token exists. If req.body.token is null or undefined, the expression evaluates to undefined.
           Otherwise, it checks if req.body.token.refresh exists.
           If req.body.token.refresh is null or undefined, the final result is undefined.
           Otherwise, it assigns the value of req.body.token.refresh to the refreshToken variable.
           This way, you avoid potential errors if any part of the chain is missing or nullish.
           */

        if (refreshToken) {

            jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {

                if (err) {

                    res.errorStatusCode = 401
                    throw err
                } else {

                    const { _id, password } = userData

                    if (_id && password) {

                        const user = await User.findOne({ _id })

                        if (user && user.password == password) {

                            if (user.isActive) {

                                // const data = {
                                //     access: user.toJSON(),
                                //     refresh: { _id: user._id, password: user.password },
                                //     shortExpiresIn: '10m',
                                //     longExpiresIn: '3d'
                                // }

                                // res.send({
                                //     error: false,
                                //     token: {
                                //         access: jwt.sign(data.access, process.env.ACCESS_KEY, { expiresIn: data.shortExpiresIn }),
                                //         refresh: null
                                //     }
                                // })

                                res.send({
                                    error: false,
                                    token: setToken(user, true)
                                })

                            } else {

                                res.errorStatusCode = 401
                                throw new Error('This account is not active.')
                            }
                        } else {

                            res.errorStatusCode = 401
                            throw new Error('Wrong id or password.')
                        }
                    } else {

                        res.errorStatusCode = 401
                        throw new Error('Please enter id and password.')
                    }
                }
            })

        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter token.refresh')
        }
    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */

        res.send({
            error: false,
            message: 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        })

    },
}


//This is a Node.js Express controller for handling user authentication. It includes three main functions: login, refresh, and logout.

// 1. Login: This function handles user login.It takes a username and password from the request body, verifies the credentials, and generates access and refresh tokens if the login is successful.The access token is short - lived(10 minutes) and the refresh token is long - lived(3 days).The tokens are signed using a secret key stored in environment variables.The function also checks if the user account is active before generating tokens.
// 2.
// Refresh: This function handles token refreshing.It takes a refresh token from the request body, verifies the token, and generates a new access token if the refresh token is valid.The access token is again short - lived(10 minutes).The function also checks if the user account is active before generating the new access token.
// 3.
// Logout: This function handles user logout.It does not require any specific action; the client should simply delete the Bearer token from their browser to log out.


// The code also includes Swagger comments for API documentation, which can be used to generate API documentation automatically.

//     Overall, this code snippet demonstrates a basic implementation of user authentication using JSON Web Tokens (JWT) in a Node.js Express application.



// const jwt = require('jsonwebtoken'): This line imports the jsonwebtoken module and assigns it to the jwt variable.This module is used for generating and verifying JSON Web Tokens(JWTs).
// const setToken = require('../../helpers/setToken'): This line imports the setToken function from the setToken module located in the helpers directory.This function is used to generate and set the JWTs for the user.
// const User = require('../../models/user'): This line imports the User model from the user module located in the models directory.This model is used to interact with the users collection in the database.
//     module.exports = {: This line starts the definition of an object that will be exported from this module.This object will contain the functions that implement the authentication logic.
//         login: async(req, res) => {: This line defines an asynchronous function called login that takes in the req and res objects as arguments.This function will handle the login logic.
//             const { username, password } = req.body;: This line destructures the username and password properties from the req.body object and assigns them to the username and password variables, respectively.These values are obtained from the request body, which is typically sent as JSON data in the HTTP request.
//                 if(username && password) {: This line checks if both username and password are truthy values.If either of them is falsy(e.g., null, undefined, or an empty string), the code inside the curly braces will not be executed.
//?This a function named login within an exported object from a Node.js Express controller for handling user authentication. This function is defined as an asynchronous function that takes in the req and res objects as arguments.
//? The login function extracts the username and password from the request body using destructuring.It then checks if both username and password are provided.If they are, the function uses the User model to find a user in the database with the given username and password.If a user is found, it further checks if the user's account is active. If both conditions are met, the function sends a response to the client with a JSON object containing an error property set to false and a token property set to the value returned by the setToken function.
//? If either the username or password is missing or the user's account is not active, the function sends an error response with an appropriate error status code and message.
//? This code  demonstrates a basic implementation of user authentication using JSON Web Tokens (JWT) in a Node.js Express application.The login function handles the login logic, including verifying user credentials, generating JWT tokens, and checking user account status.


//         const user = await User.findOne({ username, password });: This line uses the User model to find a user in the database with the given username and password.The findOne method returns a promise that resolves to the first document that matches the query.The await keyword is used to pause the execution of the function until the promise is resolved.
//             if(user) {: This line checks if the user variable is a truthy value.If it is, the code inside the curly braces will be executed.
//                 if(user.isActive) {: This line checks if the user object has an isActive property that is set to true.If it is, the code inside the curly braces will be executed.
//                     res.send({ error: false, token: setToken(user), });: This line sends a response to the client with a JSON object that contains an error property set to false and a token property set to the value returned by the setToken function. The setToken function generates and sets the JWTs for the user.
// } else {: This line starts an else block that will be executed if the user.isActive condition is not met.
//                 res.errorStatusCode = 401;: This line sets the errorStatusCode property of the res object to 401. This indicates that the request was unauthorized.
//                 throw new Error('This account is not active.');: This line throws an error with the message 'This account is not active.'.
// }: This line closes the if block that checks if the user object has an isActive property set to true.
// } else {: This line starts an else block that will be executed if the user variable is not a truthy value.
//             res.errorStatusCode = 401;: This line sets the errorStatusCode property of the res object to 401. This indicates that the request was unauthorized.
//             throw new Error('Wrong username or password.');: This line throws an error with the message 'Wrong username or password.'.
// }: This line closes the if block that checks if the user variable is a truthy value.
// } else {: This line starts an else block that will be executed if either the username or password variable is a falsy value.
//         res.errorStatusCode = 401;: This line sets the errorStatusCode property of the res object to 401. This indicates that the request was unauthorized.
//         throw new Error('Please enter username and password.');: This line throws an error with the message 'Please enter username and password.'.
// }: This line closes the if block that checks if both the username and password variables are truthy values.
// };: This line closes the login function definition.25