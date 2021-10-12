"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// nota: los archivos que se van al servidor serian los que estan en dist, los que estan fuera de dist son de desarrollo
// Para que typescript pase automaticamente los cmabios se corre con tsc --watch (desarrollo)
// en produccion se corre normal ya sea nodemon o node
// nodemon dist/app.js
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map