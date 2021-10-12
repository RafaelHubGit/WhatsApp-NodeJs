import express, { Application } from 'express';
import cors from 'cors';

import { routes } from '../routes/indexRoutes';

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8001';

        this.middlewares();
        //Definir mis rutas
        // this.routes();
        routes( this.app );

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

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        } )
    }
}

export default Server;