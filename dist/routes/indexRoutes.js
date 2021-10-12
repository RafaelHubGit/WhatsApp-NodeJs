"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const whatsApp_1 = __importDefault(require("../routes/whatsApp"));
const routes = (app) => {
    const url = '/api';
    const apiPaths = {
        whatsApp: `${url}/whatsApp`
    };
    app.use(apiPaths.whatsApp, whatsApp_1.default);
};
exports.routes = routes;
//# sourceMappingURL=indexRoutes.js.map