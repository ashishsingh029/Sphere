import {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response
} from "express";
import {
    HTTPSTATUS
} from "../config/http.config";
export const customErrorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
):any => {
    console.error(`Error occurred on Path = ${ req.path }`);
    if(
        error instanceof SyntaxError
    ) {
        return res.status(
            HTTPSTATUS.BAD_REQUEST
        ).json({
            message: "Invalid Json Format, Please check your request json File",
        })
    }
    return res.status(
        HTTPSTATUS.INTERNAL_SERVER_ERROR
    ).json({
        message: "Internal Server Error",
        error: error?.message || "Unexpected error occurred"
    })
}