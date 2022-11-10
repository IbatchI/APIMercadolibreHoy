import express from 'express'
import cors from 'cors'

import { authRoutes } from '../routes/auth'
import { dbConnection } from '../../database/config'
import { publicationRoutes } from '../routes'
import { searchRoutes } from '../routes/search'
import { usersRoutes } from '../routes/users'

class Server {
    app: express.Application
    port: string
    // Routes of my app
    paths: {
        authPath: string
        publicationPath: string
        searchPath: string
        usersPath: string
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000'
        // Paths of my app
        this.paths = {
            authPath: '/api/auth',
            publicationPath: '/api/publication',
            searchPath: '/api/search',
            usersPath: '/api/users',
        }

        // Connect to database
        this.connectionDb()
        
        // Middlewares
        this.middlewares()

        // Routes of my app
        this.routes()
    }

    async connectionDb() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Read and parse body
        this.app.use(express.json())

        // Public directory
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.authPath, authRoutes)
        this.app.use(this.paths.publicationPath, publicationRoutes)
        this.app.use(this.paths.searchPath, searchRoutes)
        this.app.use(this.paths.usersPath, usersRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

export default Server