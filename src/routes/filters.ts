import { Router } from "express"
import { check } from "express-validator"

import { isNameValid, searchExistsById } from "../../helpers/db-validators"
import { validateFields } from "../../middlewares/validate-fields"
import { validateJWT } from "../../middlewares/validate-jwt"
import { saveFilterForSearch } from "../controllers/filter"

export const filtersRoutes = Router()

// Get all filters by search
// filtersRoutes.get('/',[
//     validateJWT,
//     validateFields,
//     check('limit', 'El límite no es válido').isNumeric(),
//     check('from', 'El from no es válido').isNumeric(),
// ], getAllPublications)

// Save a filter for a search
filtersRoutes.post('/',[
    validateJWT,
    validateFields,
    check('name', 'El nombre es obligatorio').not().isEmpty().custom( isNameValid ),
    check('searchId').custom(searchExistsById),
], saveFilterForSearch)

// // Delete a publication
// filtersRoutes.delete('/:id',[
//     validateJWT,
//     validateFields,
//     check('id', 'El id no es válido').isMongoId(),
//     check('id').custom(publicationExistsById),
// ], publicationDelete)

// // mark as viewed a publication
// filtersRoutes.put('/markAsViewed',[
//     validateJWT,
//     validateFields,
//     check('id', 'El id no es válido').isMongoId(),
//     check('id').custom(publicationExistsById),
//     check('keyword', 'La búsqueda es obligatoria').not().isEmpty(),
//     check('wantedPrice', 'El precio es obligatorio').not().isEmpty(),
//     check('wantedPrice', 'El precio debe ser un número').isNumeric(),
// ], markPublicationAsViewedPut)