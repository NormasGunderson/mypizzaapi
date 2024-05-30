'use strict';
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

module.exports = {
    isLogin: (req, res, next) => {
        // return next()

        if (req.isLogin || res?.locals?.user) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error('NoPermission: You must login.');
        }
    },

    isAdmin: (req, res, next) => {
        // return next()

        if ((req.isLogin && req.user.isAdmin) || res?.locals?.user?.isAdmin) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error('NoPermission: You must login and to be Admin.');
        }
    },
};


// This code snippet defines two middleware functions for handling permissions in a Node.js application.These middleware functions are commonly used in Express.js routes to restrict access to certain routes or functionality based on user roles.

// 1. isLogin: This middleware function checks if the user is logged in.It checks for the req.isLogin property, which is typically set by an authentication middleware, or the res.locals.user object, which may contain user information.If either condition is true, the function calls next() to allow the request to proceed to the next middleware or route handler.If the user is not logged in, the function sets the res.errorStatusCode to 403(Forbidden) and throws an error with the message 'NoPermission: You must login.'
// 2.
// isAdmin: This middleware function checks if the user is an admin.It checks for the req.user.isAdmin property, which is typically set by an authentication middleware when a user logs in and has admin privileges, or the res.locals.user.isAdmin property.If either condition is true, the function calls next() to allow the request to proceed.If the user is not an admin, the function sets the res.errorStatusCode to 403(Forbidden) and throws an error with the message 'NoPermission: You must login and to be Admin.'


// These middleware functions can be used in Express.js routes to protect sensitive endpoints or functionality by requiring users to be logged in or admins before accessing them.For example, you can apply these middleware functions to specific routes using the app.use() or router.use() methods, or by directly applying them to route handlers using the router.get(), router.post(), etc.methods.