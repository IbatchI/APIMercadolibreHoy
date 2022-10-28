import { Router } from 'express'
import { check } from 'express-validator'

import { login, googleSignIn } from '../controllers/auth'
import { validateFields } from '../../middlewares/validate-fields';

export const authRoutes = Router()

authRoutes.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login)

authRoutes.post('/google', [
    check('id_token', 'El id_token de Google es obligatorio').not().isEmpty(),
    validateFields
], googleSignIn)