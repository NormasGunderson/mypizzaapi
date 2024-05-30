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

//from <% ... %> to {% ...%} the default <%%> conflict with the content of the templates. e.g, if the templates contain a lot of HTML code with < and > characters
const ejs = require('ejs')
ejs.openDelimiter = '{'
ejs.closeDelimiter = '}'

app.set('views', './public')
app.set('view engine', 'ejs')

app.set('view options', {
    openDelimiter: '{', closeDelimiter: '}'
})

app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public/assets'))
//Middleware
app.use(express.json())

app.use(require('./src/middlewares/authentication'))

app.use(require('./src/middlewares/logger'))

app.use(require('./src/middlewares/findSearchSortPage'))
// Routes: TEMPLATE + SESSION:
//Home Path: 
app.all('./', (req, res) => {
    res.redirect('/pizzas')
})
app.use('/auth', require('./src/routes/view/auth'))

app.use('/users', require('./src/routes/view/user'))

app.use('/orders', require('./src/routes/view/order'))

app.use('/pizzas', require('./src/routes/view/pizza'))

app.use('/toppings', require('./src/routes/view/topping'))

// Routes: API + JWT:

//HomePath:
app.all('./api', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        isLogin: req.isLogin,
        user: req.user
    })
})

app.use('/api/auth', require('./src/routes/api/auth'))

app.use('/api/users', require('./src/routes/api/user'))

app.use('/api/orders', require('./src/routes/api/order'))

app.use('/api/pizzas', require('./src/routes/api/pizza'))

app.use('/api/toppings', require('./src/routes/api/topping'))

//handling error 

app.use(require('./src/middlewares/errorHandler'))

app.listen(PORT, () => console.log(`Server is running on port http://127.0.0.1:'+${PORT}`))

//! Synchronization (must be in commentLine):  synchronization process that involves clearing the database from where
// require('./src/helpers/sync')() // !!! It clear database.