import * as joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../../utils/schemaValidator";
import { ProcessError } from "../../utils/processError";

const userLoginSchema = joi
    .object({
        email: joi.string().email().required().messages({
            "string.email": "Informe um e-mail válido",
            "any.required": "Campo email é obrigatório",
        }),
        password: joi
            .string()
            .required()
            .pattern(new RegExp(/^\d{8}$/))
            .messages({
                "any.required": "Campo senha é obrigatório",
                "string.pattern.base": "A senha é composta somente por números e deve possuir 8 numeros",
            }),
    })
    .messages({
        "object.unknown": "Campo {#label} não é permitido",
    });

export const validateLoginUserSchema = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        await validateBody(req, next, userLoginSchema);
    } catch (error) {
        return ProcessError(res, error);
    }
};
