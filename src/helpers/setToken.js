'use strict'

const jwt = require('jsonwebtoken')

module.exports = function ( userData, isRefresh = false) {

    const data = {
        access: userData.toJSON(),
        refresh: { _id: userData._id, password: userData.password },
        shortExpiresIn: '30m',
        longExpiresIn: '30d'
    }

    return {
        access: jwt.sign(data.access, process.env.ACCESS_KEY,  { expiresIn: data.shortExpiresIn }), 
        refresh: (isRefresh ? undefined : jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.longExpiresIn }))
    }

}

//The selected code snippet is a function that generates JSON Web Tokens (JWTs) for access and refresh tokens. The function takes two parameters: userData, which is an object containing user information, and isRefresh, which is an optional boolean flag indicating whether the token is a refresh token.

// Here's a breakdown of the code:

// 1.
// The function begins by requiring the jsonwebtoken module, which provides functions for working with JWTs.
// 2.
// The function is exported as a module, allowing it to be used in other parts of the application.
// 3.
// Inside the function, a data object is created to store the user data, refresh token data, and expiration times for the access and refresh tokens.The userData.toJSON() method is used to convert the user data to a JSON object.
// 4.
// The data object is then used to generate the access token using the jwt.sign() method.The access token is signed with the ACCESS_KEY from the environment variables and has an expiration time of 30 minutes(data.shortExpiresIn).
// 5.
// Similarly, the data object is used to generate the refresh token.However, if the isRefresh flag is true, the refresh token is not generated.Otherwise, the refresh token is signed with the REFRESH_KEY from the environment variables and has an expiration time of 3 days(data.longExpiresIn).
// 6.
// Finally, the function returns an object containing the generated access token and refresh token(if applicable).


// This code snippet demonstrates how to create JWTs for access and refresh tokens in a Node.js application using the jsonwebtoken module.The JWTs are generated based on the provided user data and expiration times.