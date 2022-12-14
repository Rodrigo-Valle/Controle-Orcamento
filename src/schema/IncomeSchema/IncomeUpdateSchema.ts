import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../../utils/schemaValidator";
import { ProcessError } from "../../utils/processError";

const incomeUpdateSchema = joi.object({
    id: joi.any().forbidden(),
    description: joi.string().optional().messages({}),
    value: joi.number().optional().messages({}),
    date: joi.date().optional().messages({}),
});

export const validateUpdateIncomeSchema = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        await validateBody(req, next, incomeUpdateSchema);
    } catch (error) {
        return ProcessError(res, error);
    }
};
