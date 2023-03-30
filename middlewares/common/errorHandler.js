const createError = require('http-errors');

// Not found handler
exports.notFoundHandler = (req, res, next) => {
    next(createError('404','Your requested content was not found!'));
}

// Default error handler
exports.errorHandler = (err, req, res, next) => {
    res.locals.error = process.env.NODE_ENV === 'development' ? err : { message: err.message };
    res.status(err.status || 500);

    // For json response
    res.json(res.locals.error);
}