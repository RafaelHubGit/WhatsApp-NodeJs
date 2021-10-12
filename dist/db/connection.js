"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('aula_ibd', 'root', 'roots', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307
});
exports.default = db;
//# sourceMappingURL=connection.js.map