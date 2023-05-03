export class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}

export const ErrorValidation = (error, req, res, next) => {
    let errors = [];
    let message = '';
    if (error.name === "ValidationError") {
        Object.keys(error.errors).forEach((key) => {
            errors.push(error.errors[key].message);
        });
    }
    if (error.name === "CastError") {
        message = `Resource not found.`;
        errors.push(message);
    }
    if (error.name === "JsonWebTokenError") {
        message = `Json web token is invalid. `;
        errors.push(message);
    }

    if (errors.name === "TokenExpiredError") {
        message = `Json web token is expired. `;
        errors.push(message);
    }

    if (errors.length === 0) {
        errors.push(errors.message || "Internal Server Error.")
        error.statusCode = 500
    } else {
        error.statusCode = 400
    }
    res.status(error.statusCode).json({
        success: false,
        message: errors
    })
}