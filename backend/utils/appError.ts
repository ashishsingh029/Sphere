import {
    HTTPSTATUS,
    HttpStatusCodeType
} from "../config/http.config"
import {
    ErrorCodesEnum,
    ErrorCodeEnumType
} from "../enums/errorCodes.enum"
export class AppError extends Error {
    public statusCode: HttpStatusCodeType
    public errorCode?: ErrorCodeEnumType
    constructor(
        message: string,
        statusCode: HttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
        errorCode?: ErrorCodeEnumType
    ) {
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
        Error.captureStackTrace(
            this,
            this.constructor
        )
    }
}
export class HttpException extends AppError {
    constructor(
        message = "Http Exception Error",
        statusCode: HttpStatusCodeType,
        errorCode?: ErrorCodeEnumType
    ) {
        super(
            message,
            statusCode,
            errorCode
        )
    }
}
export class InternalServerException extends AppError {
    constructor(
        message: string = "Internal Server Error",
        errorCode?: ErrorCodeEnumType
    ) {
        super(
            message,
            HTTPSTATUS.INTERNAL_SERVER_ERROR,
            errorCode || ErrorCodesEnum.INTERNAL_SERVER_ERROR
        )
    }
}
export class NotFoundException extends AppError {
    constructor(
        message: string = "Resource Not Found",
        errorCode?: ErrorCodeEnumType
    ) {
        super(
            message,
            HTTPSTATUS.NOT_FOUND,
            errorCode || ErrorCodesEnum.RESOURCE_NOT_FOUND
        )
    }
}
export class BadRequestException extends AppError {
    constructor(
        message = "Bad Request",
        errorCode?: ErrorCodeEnumType
    ) {
        super(
            message,
            HTTPSTATUS.BAD_REQUEST,
            errorCode || ErrorCodesEnum.VALIDATION_ERROR
        )
    }
}
export class UnauthorizedException extends AppError {
    constructor(
        message = "Unauthorized Access",
        errorCode?: ErrorCodeEnumType
    ) {
        super(
            message,
            HTTPSTATUS.UNAUTHORIZED,
            errorCode || ErrorCodesEnum.ACCESS_UNAUTHORIZED
        )
    }
}