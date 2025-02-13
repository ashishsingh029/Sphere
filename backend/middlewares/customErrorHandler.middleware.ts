import {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response
} from "express"
import {
    HTTPSTATUS
} from "../config/http.config"
import { AppError } from "../utils/appError"
export const customErrorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
):any => {
    console.error(
        `Error occurred on Path = ${ req.path }`
    )
    if(
        error instanceof SyntaxError
    ) {
        return res.status(
            HTTPSTATUS.BAD_REQUEST
        ).json({
            message: "Invalid Json Format, Please check your request json File"
        })
    }
    if(
        error instanceof AppError
    ) {
        return res.status(
            error.statusCode
        ).json({
            message: error.message,
            errorCode: error.errorCode
        })
    }
    return res.status(
        HTTPSTATUS.INTERNAL_SERVER_ERROR
    ).json({
        message: "Internal Server Error",
        error: error?.message || "Unexpected error occurred"
    })
}