'use strict'

const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const auth = req.headers?.authorization

    const accessToken = auth ? auth.split(' ')[1] : null

    req.isLogin = false
    req.user = null
    //work only with api calls
    jwt.verify(accessToken, process.env.ACCESS_KEY, function (err, userData) {
        if (userData && userData.isActive) {
            req.isLogin = true
            req.user = userData
        }
    })

    res.locals.user = req.session?.user

    next()
}

//The selected code is an Express middleware function that handles authentication and populates user-related data on the request object. Here's a breakdown of the code:

// 1. The middleware function is exported using module.exports.
// 2. It takes three parameters: req, res, and next.
// 3. The req.headers?.authorization expression is used to retrieve the authorization header from the incoming HTTP request.The?.operator is a safe navigation operator, which ensures that the code doesn't throw an error if the authorization property is null or undefined.
// 4.
// The auth variable is then split by a space to extract the access token.If the authorization header is not present or does not contain a valid token, accessToken will be null.
// 5.
// The req.isLogin and req.user properties are initialized to false and null, respectively.These properties will be used to track the user's login status and user data throughout the request lifecycle.
// 6.
// The jwt.verify() function is used to verify the access token.It takes three parameters: the access token, the access key(which is retrieved from the process.env.ACCESS_KEY environment variable), and a callback function.
// 7.
// Inside the callback function, if there is no error(err is null) and the user data is present(userData is not null), the req.isLogin property is set to true, and the req.user property is set to the user data.
// 8.
// Finally, the res.locals.user property is set to the value of req.session?.user.This line is not directly related to authentication but is included for context.
// 9.
// The next() function is called to move on to the next middleware in the request pipeline.


//     Overall, this middleware function handles authentication by verifying the access token and populating user - related data on the request object.It also sets the res.locals.user property for further use in the application.