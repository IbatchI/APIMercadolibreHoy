import { Router } from "express"
import { check } from "express-validator"

import { getAllPublications, markPublicationAsViewedPut, publicationDelete, publicationPost } from "../controllers/publication"
import { publicationExistsById, searchExistsById } from "../../helpers/db-validators"
import { validateFields } from "../../middlewares/validate-fields"
import { validateJWT } from "../../middlewares/validate-jwt"

export const publicationRoutes = Router()

// Get all mi publications
publicationRoutes.get('/',[
    validateJWT,
    validateFields,
    check('limit', 'El límite no es válido').isNumeric(),
    check('from', 'El from no es válido').isNumeric(),
], getAllPublications)

// Save a new publication
publicationRoutes.post('/',[
    validateJWT,
    validateFields,
    check('link', 'El link es obligatorio').not().isEmpty(),
    check('price', 'El precio debe ser un número').isNumeric(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('searchId').custom(searchExistsById),
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('uniqueIdFromML', 'El id_ML es obligatorio').not().isEmpty(),
], publicationPost)

// Delete a publication
publicationRoutes.delete('/:id',[
    validateJWT,
    validateFields,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(publicationExistsById),
], publicationDelete)

// mark as viewed a publication
publicationRoutes.put('/markAsViewed',[
    validateJWT,
    validateFields,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(publicationExistsById),
    check('keyword', 'La búsqueda es obligatoria').not().isEmpty(),
    check('wantedPrice', 'El precio es obligatorio').not().isEmpty(),
    check('wantedPrice', 'El precio debe ser un número').isNumeric(),
], markPublicationAsViewedPut)