import { Router } from "express"
import { check } from "express-validator"

import { getAllPublications} from "../controllers/publication"
import { searchExistsById } from "../../helpers/db-validators"
import { validateFields } from "../../middlewares/validate-fields"
import { validateJWT } from "../../middlewares/validate-jwt"

export const publicationRoutes = Router()

// Get all mi publications
publicationRoutes.post('/unseenPosts',[
    validateJWT,
    validateFields,
    check('searchId').custom(searchExistsById),
], getAllPublications)
