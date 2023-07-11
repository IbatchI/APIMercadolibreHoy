import { Router } from "express"
// import { check } from "express-validator"

// import { saveViewedPosts} from "../controllers/publication"
// import { searchExistsById } from "../../helpers/db-validators"
// import { validateFields } from "../../middlewares/validate-fields"
// import { validateJWT } from "../../middlewares/validate-jwt"

export const publicationRoutes = Router()

/**
 * We past an array of uniqueIdsFromML and return an array of publications that are not saved in the db
 * @param {string} searchID - Id of the search
 * @returns {Array<string>} - Array of uniqueIdsFromML
 */
// publicationRoutes.post('/unseenPosts',[
//     validateJWT,
//     validateFields,
//     check('searchId').custom(searchExistsById),
// ], saveViewedPosts)
