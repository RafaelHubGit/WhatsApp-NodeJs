"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsApp_1 = require("../controllers/whatsApp");
const router = (0, express_1.Router)();
router.get('/', whatsApp_1.whatsAppInit);
// router.get('/:id', getUsuario);
router.post('/', whatsApp_1.whatsAppSend);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);
exports.default = router;
//# sourceMappingURL=whatsApp.js.map