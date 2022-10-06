import express from 'express'
import cors from 'cors'

import { dbConnection } from '../../database/config'
import { usersRoutes } from '../routes/users'
import { authRoutes } from '../routes/auth'

class Server {
    app: express.Application
    port: string
    // Routes of my app
    authPath: string
    usersPath: string
    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000'
        // Paths of my app
        this.authPath = '/api/auth'
        this.usersPath = '/api/users'

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
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.usersPath, usersRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

export default Server