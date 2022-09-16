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
exports.userExistsById = exports.emailIsAlreadyRegistered = void 0;
const user_1 = __importDefault(require("../src/models/user"));
const emailIsAlreadyRegistered = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield user_1.default.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
});
exports.emailIsAlreadyRegistered = emailIsAlreadyRegistered;
const userExistsById = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_1.default.findById(id);
    if (!userExists) {
        throw new Error(`El id ${id} no existe`);
    }
});
exports.userExistsById = userExistsById;
