'use strict'
//passwordEncrypt(password:string):

const crypto = require('node:crypto'),
    keyCode = process.env.SECRET_KEY,
    loopCount = 10_000,
    charCount = 32,
    encType = 'sha512';

module.exports = function (password) {
    return crypto.pbkdf2(password, keyCode, loopCount, charCount, encType).toString ('hex')
}


// The selected code snippet is an export of a function that uses the crypto module in Node.js to perform password encryption using the PBKDF2 (Password - Based Key Derivation Function 2) algorithm.

//     Here's a breakdown of the code:

// 1.
// The crypto module is imported using require('node:crypto').This module provides cryptographic functionality in Node.js.
// 2.
// Three constants are defined at the top of the file:
// keyCode: This is the secret key used for encryption.It is obtained from the process.env.SECRET_KEY environment variable.
//     loopCount: This is the number of iterations for the PBKDF2 algorithm.In this case, it is set to 10,000.
//         charCount: This is the length of the derived key in bytes.In this case, it is set to 32.
// encType: This is the encryption type to be used.In this case, it is set to 'ha512'.
// 3.
// The function module.exports is used to export the password encryption function. This function takes a password as an argument.
// 4.
// Inside the function, the crypto.pbkdf2Sync method is used to derive a key from the password using the PBKDF2 algorithm.The pbkdf2Sync method takes the following parameters:
//     password: The password to be encrypted.
//     keyCode: The secret key used for encryption.
//         loopCount: The number of iterations for the PBKDF2 algorithm.
//             charCount: The length of the derived key in bytes.
//                 encType: The encryption type to be used.
// 5.
// The derived key is returned as a hexadecimal string using the toString('hex') method.


// This password encryption function can be used to securely store passwords in a database or other sensitive data storage.The derived key is derived from the password using the PBKDF2 algorithm, which is a secure and widely-used method for password hashing.The secret key is stored in an environment variable to prevent it from being exposed in the code.