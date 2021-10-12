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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const usuarios_1 = require("../helpers/usuarios");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    // const existEmaill =  await existEmail( body.email );
    if (!(yield (0, usuarios_1.existEmail)(body.email))) {
        return res.status(404).json({
            msg: 'No existe el email ' + body.email
        });
    }
    const usuario = yield usuario_1.default.findOne({
        where: {
            email: body.email
        }
    });
    if (bcryptjs_1.default.compareSync(body.contrasena, usuario === null || usuario === void 0 ? void 0 : usuario.getDataValue('contrasena'))) {
        return res.json({
            login: true
        });
    }
    else {
        return res.status(404).json({
            login: false,
            msg: 'Contraseña incorrecta'
        });
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map