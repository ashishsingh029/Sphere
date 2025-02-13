import "dotenv/config"
// @ts-ignore
import express, {
    Express,
    NextFunction,
    Request,
    Response
} from "express"
// @ts-ignore
import cors from "cors"
// @ts-ignore
import session from "cookie-session"
import {
    config
} from './config/app.config'
import connectMongoDb from "./config/mongo.config"
import {
    customErrorHandler
} from "./middlewares/customErrorHandler.middleware"
import {
    HTTPSTATUS
} from "./config/http.config";
import {
    asyncHandler
} from "./middlewares/asyncHandler.middleware";

const app: Express = express()
const BASE_PATH: string = config.BASE_PATH
app.use(
    express.json()
)
app.use(
    express.urlencoded({
        extended: true }
    )
)
app.use(
    session({
        name: 'session',
        keys: [ config.SESSION_SECRET ],
        maxAge: 24*60*60*1000,
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: 'lax'
    })
)
app.use(
    cors({
        origin: config.FRONTEND_ORIGIN,
        credentials: true
    })
)
app.get(
    '/',
    asyncHandler(
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<any>  => {
            // throw new BadRequestException(  // Testing Exception
            //     "It's a bad request",
            //     ErrorCodesEnum.RESOURCE_NOT_FOUND
            // )
            return res.status(
                HTTPSTATUS.OK
            ).json({
                message: "StudySphere First Api"
            })
        }
    )
)
app.use(
    customErrorHandler
)
app.listen(
    config.PORT,
    async (): Promise<void> => {
        console.log(
            `Server is Intercepting Requests on port = ${ config.PORT } in ${ config.NODE_ENV } mode`
        )
        await connectMongoDb()
    }
)