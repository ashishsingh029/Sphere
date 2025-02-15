"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customErrorHandler = void 0;
var http_config_1 = require("../config/http.config");
var appError_1 = require("../utils/appError");
var customErrorHandler = function (error, req, res, next) {
    console.error("Error occurred on Path = ".concat(req.path));
    if (error instanceof SyntaxError) {
        return res.status(http_config_1.HTTPSTATUS.BAD_REQUEST).json({
            message: "Invalid Json Format, Please check your request json File"
        });
    }
    if (error instanceof appError_1.AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode
        });
    }
    return res.status(http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: (error === null || error === void 0 ? void 0 : error.message) || "Unexpected error occurred"
    });
};
exports.customErrorHandler = customErrorHandler;
