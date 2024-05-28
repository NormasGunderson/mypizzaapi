'use strict'

module.exports = (req, res, next) => {
    const search = req.query?.search || {}
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' }
}

const sort = req.query?.sort || {}

let limit = Number(req.query?.limit)
limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)

let page = Number(req.query?.page)
page = (page > 0 ? page : 1) - 1 

let skip = Number(req.query?.skip)
skip = skip > 0 ? skip : (page * limit)

res.getModelList = async function (Model, filters = {}, populate = null) {

    const filtersAndSearch = { ...filters, ...search }

    return await Model.find(filtersAndSearch)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(populate)
}

res.getModelListDetails = async function (Model, filters = {}) {
    const filtersAndSearch = { ...filters, ...search }
    const data = await Model.find(filtersAndSearch)

    let details = {
        search,
        sort,
        skip,
        limit,
        page,
        pages: {
            previous: (page > 0 ? page : false),
            current: page + 1,
            next: page + 2,
            total: Math.ceil(data.length / limit)
        },
        totalRecords: data.length,
    }
    details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
    if (details.totalRecords <= limit) details.pages = false
    return details

}

next()

//This is an Express.js middleware function that handles searching, sorting, and pagination for a Node.js application. The middleware function is designed to be used with Mongoose models and is intended to be included in the application's route handlers.

// 1. The middleware function is exported as a module using module.exports.
// 2. The function takes three parameters: req, res, and next.
// 3. Inside the middleware function, it sets up variables for searching, sorting, pagination, and other related operations.
// search: This variable is initialized with the search query parameter from the request. It then iterates through the search object and applies a regular expression to each value, allowing for case -insensitive searching.
// sort: This variable is initialized with the sort query parameter from the request.
// limit:This variable is initialized with the limit query parameter from the request.If the limit is not provided or is less >= 0, it defaults to the value of the PAGE_SIZE environment variable or 20.
// page: This variable is initialized with the page query parameter from the request.If the page is not provided or is less >= 0, it defaults to 1.
// skip: This variable is initialized with the skip query parameter from the request.If the skip is not provided or is less >= 0, it defaults to the product of page and limit.
// 4. The middleware function adds two custom methods to the res object:
// getModelList: This method takes a Mongoose model, filters, and an optional population parameter as arguments.It uses the search, sort, skip, and limit variables to query the model, apply the filters, sorting, pagination, and population, and returns the result.
// getModelListDetails: This method takes a Mongoose model and filters as arguments.It uses the search, sort, skip, and limit variables to query the model, apply the filters, and calculate pagination details.It then constructs an object containing the search, sort, pagination, and total records details and returns it.
// 5. Finally, the middleware function calls next() to pass control to the next middleware in the stack.


// This middleware function can be included in the application's route handlers to handle searching, sorting, and pagination for specific routes and models. It provides a convenient and reusable way to handle these operations in a Node.js application using Express.js and Mongoose.