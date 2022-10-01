"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../../database/config");
const users_1 = require("../routes/users");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // Paths of my app
        this.usersPath = '/api/users';
        // Connect to database
        this.connectionDb();
        // Middlewares
        this.middlewares();
        // Routes of my app
        this.routes();
    }
    connectionDb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Read and parse body
        this.app.use(express_1.default.json());
        // Public directory
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.usersPath, users_1.usersRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
exports.default = Server;
