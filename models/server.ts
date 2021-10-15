import express, { Application } from 'express';
import cors from 'cors';

import { routes } from '../routes/indexRoutes';

class Server {

    private app: Application;
    private port: string;

    private server: any;
    private io: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8001';

        // Para socker.io
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );

        this.middlewares();
        //Definir mis rutas
        // this.routes();
        routes( this.app );

        //Sockets
        this.sockets();

    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura del body
        this.app.use( express.json() );

        //Carpeta publica
        this.app.use( express.static('public') );
    }

    // routes( app: any ) {
        // this.app.use( this.apiPaths.usuarios, userRoutes );
        // this.app.use( this.apiPaths.login, loginRoutes );
    // }

    sockets() {
        this.io.on('connection', ( socket: any ) => {
            console.log('Cliente conectado, ', socket.id);

            socket.on('disconnect', () => {
                console.log('Cliente desconectado: ', socket.id);
            })
        })
    }

    listen() {
        // this.app.listen( this.port, () => {
        //     console.log('Servidor corriendo en puerto ' + this.port);
        // } )

        // En sockjer.io solo se cambia esto this.app por this.server
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        } )
    }
}

export default Server;