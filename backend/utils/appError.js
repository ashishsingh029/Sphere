"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = exports.InternalServerException = exports.HttpException = exports.AppError = void 0;
var http_config_1 = require("../config/http.config");
var errorCodes_enum_1 = require("../enums/errorCodes.enum");
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, statusCode, errorCode) {
        if (statusCode === void 0) { statusCode = http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR; }
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.errorCode = errorCode;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
var HttpException = /** @class */ (function (_super) {
    __extends(HttpException, _super);
    function HttpException(message, statusCode, errorCode) {
        if (message === void 0) { message = "Http Exception Error"; }
        return _super.call(this, message, statusCode, errorCode) || this;
    }
    return HttpException;
}(AppError));
exports.HttpException = HttpException;
var InternalServerException = /** @class */ (function (_super) {
    __extends(InternalServerException, _super);
    function InternalServerException(message, errorCode) {
        if (message === void 0) { message = "Internal Server Error"; }
        return _super.call(this, message, http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode || errorCodes_enum_1.ErrorCodesEnum.INTERNAL_SERVER_ERROR) || this;
    }
    return InternalServerException;
}(AppError));
exports.InternalServerException = InternalServerException;
var NotFoundException = /** @class */ (function (_super) {
    __extends(NotFoundException, _super);
    function NotFoundException(message, errorCode) {
        if (message === void 0) { message = "Resource Not Found"; }
        return _super.call(this, message, http_config_1.HTTPSTATUS.NOT_FOUND, errorCode || errorCodes_enum_1.ErrorCodesEnum.RESOURCE_NOT_FOUND) || this;
    }
    return NotFoundException;
}(AppError));
exports.NotFoundException = NotFoundException;
var BadRequestException = /** @class */ (function (_super) {
    __extends(BadRequestException, _super);
    function BadRequestException(message, errorCode) {
        if (message === void 0) { message = "Bad Request"; }
        return _super.call(this, message, http_config_1.HTTPSTATUS.BAD_REQUEST, errorCode || errorCodes_enum_1.ErrorCodesEnum.VALIDATION_ERROR) || this;
    }
    return BadRequestException;
}(AppError));
exports.BadRequestException = BadRequestException;
var UnauthorizedException = /** @class */ (function (_super) {
    __extends(UnauthorizedException, _super);
    function UnauthorizedException(message, errorCode) {
        if (message === void 0) { message = "Unauthorized Access"; }
        return _super.call(this, message, http_config_1.HTTPSTATUS.UNAUTHORIZED, errorCode || errorCodes_enum_1.ErrorCodesEnum.ACCESS_UNAUTHORIZED) || this;
    }
    return UnauthorizedException;
}(AppError));
exports.UnauthorizedException = UnauthorizedException;
