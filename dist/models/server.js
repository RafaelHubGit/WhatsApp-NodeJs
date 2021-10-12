"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = require("../routes/indexRoutes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8001';
        this.middlewares();
        //Definir mis rutas
        // this.routes();
        (0, indexRoutes_1.routes)(this.app);
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    // routes( app: any ) {
    // this.app.use( this.apiPaths.usuarios, userRoutes );
    // this.app.use( this.apiPaths.login, loginRoutes );
    // }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map