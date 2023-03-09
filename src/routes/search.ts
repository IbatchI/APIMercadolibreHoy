import { Router } from "express"
import { check } from "express-validator"

import { getAllSearches, searchDelete, searchPost, searchPut } from "../controllers/search"
import { filterExistsById, searchExistsById } from "../../helpers/db-validators"
import { validateFields } from "../../middlewares/validate-fields"
import { validateJWT } from "../../middlewares/validate-jwt"

export const searchRoutes = Router()

// Get all mi search
searchRoutes.get('/',[
    validateJWT,
    validateFields,
    check('limit', 'El límite no es válido').isNumeric(),
    check('from', 'El from no es válido').isNumeric(),
], getAllSearches)

// Save a new search
searchRoutes.post('/',[
    validateJWT,
    validateFields,
    check('keyword', 'La búsqueda es obligatoria').not().isEmpty(),
    check('wantedPrice', 'El precio es obligatorio').not().isEmpty(),
    check('wantedPrice', 'El precio debe ser un número').isNumeric(),
], searchPost)

// Delete a search
searchRoutes.delete('/:id',[
    validateJWT,
    validateFields,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(searchExistsById),
], searchDelete)

// Update a search
searchRoutes.put('/:id',[
    validateJWT,
    validateFields,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(searchExistsById),
    check('keyword', 'La búsqueda es obligatoria').not().isEmpty(),
    check('filtersId').custom(filterExistsById),
], searchPut)