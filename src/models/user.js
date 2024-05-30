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
        set:
    }
})
