import {
    Request,
    Response,
    NextFunction
} from "express";

type AsyncControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>

export const asyncHandler =  (controller: AsyncControllerType): AsyncControllerType =>
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
    try {
        await controller(
            req,
            res,
            next
        )
    } catch (
        error: any
        ) {
        next(
            error
        )
    }
}