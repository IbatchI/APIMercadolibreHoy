import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth'

export const authRoutes = Router()

authRoutes.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
], login)