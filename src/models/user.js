'user strict'
/*
{
    "username": "test",
    "password": "1234",
    "email": "abc@site.com",
    "isAdmin": "true"
  }
*/

const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password)
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email field must be required'],
        unique: [true, 'there is this email.  Email Field must be unique'],
        validate: [
            (email) => email.includes('@') && email.includes('.'),
            'Email type is not correct.'
        ]
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

}, {
    collection: 'users',
    timestamps: true
})


module.exports = mongoose.model('User', UserSchema)


//This code snippet is a Node.js Mongoose model for managing user data in a pizza delivery application. The model includes fields for username, password, email, isActive, and isAdmin.

// 1.
// The model begins by requiring the necessary dependencies, including the database connection.
// 2.
// A helper function, passwordEncrypt, is imported to encrypt the user's password.
// 3.
// A Mongoose schema is defined for the user model.The schema includes fields for username, password, email, isActive, and isAdmin.
// 4.
// The username field is a string, trimmed, required, and unique.
// 5.
// The password field is a string, trimmed, required, and set to encrypt the password using the passwordEncrypt function.
// 6.
// The email field is a string, trimmed, required, unique, and validated to ensure it contains an '@' symbol and a '.' symbol.
// 7.
// The isActive field is a boolean with a default value of true.
// 8.
// The isAdmin field is a boolean with a default value of false.
// 9.
// The schema is configured to use the 'users' collection in the database and to include timestamps for created and updated at fields.
// 10.
// Finally, the model is exported using Mongoose's model function, with the model name 'User' and the defined schema.


// This model provides a foundation for managing user data in the pizza delivery application, ensuring data integrity and security.