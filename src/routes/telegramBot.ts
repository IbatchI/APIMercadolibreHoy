import { Router } from "express"
import { check } from "express-validator"

import { validateFields } from "../../middlewares/validate-fields"
import { validateJWT } from "../../middlewares/validate-jwt"
import { saveChatId } from "../controllers/telegramBot"

export const botTelegramRoutes = Router()

// Save a new search
botTelegramRoutes.post('/saveChatId/:id',[
    validateJWT,
    validateFields,
    check('id', 'El id del chat es obligatorio').not().isEmpty(),
], saveChatId)
