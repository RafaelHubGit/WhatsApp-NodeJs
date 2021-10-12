"use strict";
// Se utiliza el paquete whatsapp-web.js
// pagina https://guide.wwebjs.dev/
// Ayuda: https://stackoverflow.com/questions/65157125/how-to-send-whatsapp-message-in-whatsapp-web-js
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
exports.whatsAppSend = exports.whatsAppInit = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const client = new whatsapp_web_js_1.Client({
// puppeteer: {
//     browserWSEndpoint: `ws://localhost:3000`
// }
});
const whatsAppInit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        qrcode_terminal_1.default.generate(qr, { small: true });
    });
    client.on('ready', () => {
        console.log('Client is ready!');
    });
    // client.on('message', msg => {
    //     if (msg.body == 'ping') {
    //         msg.reply('pong');
    //     }
    // });
    client.initialize();
    return res.json({
        msg: 'Ya puedes inicial sesión'
    });
});
exports.whatsAppInit = whatsAppInit;
const whatsAppSend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const number = body.numero;
    // const number = "5571104430"
    const mensaje = body.mensaje;
    const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
    const final_number = `52${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
    const number_details = yield client.getNumberId(final_number); // get mobile number details
    if (!number_details) {
        return res.json(404).json({
            msg: `El teléfono ${final_number} no esta registrado en whatsApp`
        });
    }
    try {
        yield client.sendMessage(number_details._serialized, mensaje); // send message
        res.json({
            msg: 'El mensaje fue enviado satisfactoriamente'
        });
    }
    catch (error) {
        console.log(error);
        return res.json(500).json({
            msg: `Hubo un problema al el mensaje, intentelo de nuevo. Si el problema persiste contacte con el administrador`
        });
    }
});
exports.whatsAppSend = whatsAppSend;
//# sourceMappingURL=whatsApp.js.map