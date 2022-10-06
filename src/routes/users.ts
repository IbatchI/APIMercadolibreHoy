import { Router } from 'express'
import { check } from 'express-validator'

import { validateJWT } from '../../middlewares/validate-jwt';
import { validateFields } from '../../middlewares/validate-fields'

import { emailIsAlreadyRegistered, userExistsById } from '../../helpers/db-validators';
import { usersGet, usersPost, userPut, userDelete } from '../controllers/users';

export const usersRoutes = Router()

usersRoutes.get('/', usersGet)

usersRoutes.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailIsAlreadyRegistered),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
], usersPost)

usersRoutes.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], userPut)

usersRoutes.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], userDelete)