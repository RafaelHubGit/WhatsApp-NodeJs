// Se utiliza el paquete whatsapp-web.js
// pagina https://guide.wwebjs.dev/
// Ayuda: https://stackoverflow.com/questions/65157125/how-to-send-whatsapp-message-in-whatsapp-web-js


import { Request, Response } from 'express';

import { Client } from 'whatsapp-web.js';
import qrcode  from 'qrcode-terminal';

const client = new Client({ 
    // puppeteer: {
    //     browserWSEndpoint: `ws://localhost:3000`
    // }
});

export const whatsAppInit = async ( req: Request, res: Response ) => {

  
    client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        qrcode.generate(qr, {small: true});
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
    })
}

export const whatsAppSend = async ( req: Request, res: Response ) => {

    const { body } = req;

    console.log('el body : ', body)

    const number = body.numero;
    // const number = "5571104430"
    const mensaje = body.mensaje;

    const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
    const final_number = `52${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
    
    const number_details = await client.getNumberId(final_number); // get mobile number details
    
    if ( !number_details ) {
        return res.json(404).json({
            msg: `El teléfono ${final_number} no esta registrado en whatsApp`
        }); 
    }

    try {

        if ( body.mensaje === 'hola' ){
            console.log('entra a hola')
            client.on('message', msg => {
                if (msg.body == 'hola') {
                    msg.reply('Que onda :D');
                }
            });

            return;
        }

        await client.sendMessage(number_details._serialized, mensaje); // send message
    
        res.json({
            msg: 'El mensaje fue enviado satisfactoriamente'
        })
        
    } catch (error) {
        console.log(error);

        return res.json(500).json({
            msg: `Hubo un problema al el mensaje, intentelo de nuevo. Si el problema persiste contacte con el administrador`
        }); 
    }

}