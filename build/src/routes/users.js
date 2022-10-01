"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../../helpers/db-validators");
const users_1 = require("../controllers/users");
const validate_fields_1 = require("../../middlewares/validate-fields");
exports.usersRoutes = (0, express_1.Router)();
exports.usersRoutes.get('/', users_1.usersGet);
exports.usersRoutes.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailIsAlreadyRegistered),
    (0, express_validator_1.check)('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validate_fields_1.validateFields
], users_1.usersPost);
exports.usersRoutes.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.userExistsById),
    validate_fields_1.validateFields
], users_1.userPut);
exports.usersRoutes.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.userExistsById),
    validate_fields_1.validateFields
], users_1.userDelete);
