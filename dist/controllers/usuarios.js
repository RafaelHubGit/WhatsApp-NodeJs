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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const usuarios_1 = require("../helpers/usuarios");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un susuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        if (yield (0, usuarios_1.existEmail)(body.email)) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }
        const salt = bcryptjs_1.default.genSaltSync();
        body.contrasena = bcryptjs_1.default.hashSync(body.contrasena, salt);
        body.fechaUltimaConexion = new Date();
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        if (body.email) {
            if (yield (0, usuarios_1.existEmail)(body.email)) {
                return res.status(400).json({
                    msg: 'Ya existe un usuario con el email ' + body.email
                });
            }
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    // await usuario.update({ estado : false });
    yield usuario.destroy();
});
exports.deleteUsuario = deleteUsuario;
// export const login = async ( req: Request, res: Response ) => {
//     const { body } = req.body;
//     console.log('pinches entra aqui')
//     return
//     if ( !await existEmail( body.email ) ){
//         res.json(404).json({
//             msg: 'No existe el email ' + body.email
//         });
//     }
//     const usuario = await Usuario.findOne({
//         where: {
//             email: body.email
//         }
//     });
//     bcryptjs.compareSync( body.contrasena, usuario.contrasena );
//     console.log('llego hasta aca ');
// }
// const existEmail = async ( email: string ) => {
//     const existeEmail = await Usuario.findOne({
//         where: {
//             email: email
//         }
//     });
//     if ( existeEmail ) {
//         return true;
//     } else {
//         return false;
//     }
// }
//# sourceMappingURL=usuarios.js.map