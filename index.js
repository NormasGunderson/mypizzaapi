'use stricT'
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000

require('express-async-error')

const session = require('cookie-session')
app.use(session({ secret: process.env.SECRET_KEY }))

const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()
// the default delimiters conflict with the content of the templates. For example, if the templates contain a lot of HTML code with < and > characters
const ejs = require('ejs')
ejs.openDelimiter = '{'
ejs.closeDelimiter = '}'
