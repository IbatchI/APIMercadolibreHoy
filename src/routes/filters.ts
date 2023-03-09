import { Router } from "express"
import { check } from "express-validator"

import { deleteFilter, getAllFiltersBySearch, saveFilterForSearch, updateFilter } from "../controllers/filter"
import { filterExistsById, searchExistsById } from "../../helpers/db-validators"
import { validateFields } from "../../middlewares/validate-fields"
import { validateJWT } from "../../middlewares/validate-jwt"

export const filtersRoutes = Router()

// Get all filters by search
filtersRoutes.get('/:searchId',[
    validateJWT,
    validateFields,
    check('searchId').custom(searchExistsById),
], getAllFiltersBySearch)

// Save a filter for a search
filtersRoutes.post('/',[
    validateJWT,
    validateFields,
    check('minPrice').isNumeric(),
    check('maxPrice').isNumeric(),
    check('allreadySeen').isBoolean(),
    check('searchId').custom(searchExistsById),
], saveFilterForSearch)

// update filter
filtersRoutes.put('/:id',[
    validateJWT,
    validateFields,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(filterExistsById),
    check('minPrice').isNumeric(),
    check('maxPrice').isNumeric(),
    check('allreadySeen').isBoolean(),
], updateFilter)

// Delete filter
filtersRoutes.delete('/:id',[
    validateJWT,
    validateFields,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(filterExistsById),
], deleteFilter)