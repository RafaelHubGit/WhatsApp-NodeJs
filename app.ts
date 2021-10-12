// nota: los archivos que se van al servidor serian los que estan en dist, los que estan fuera de dist son de desarrollo
// Para que typescript pase automaticamente los cmabios se corre con tsc --watch (desarrollo)
// en produccion se corre normal ya sea nodemon o node
// nodemon dist/app.js
import dotenv from 'dotenv';
import Server from './models/server';
dotenv.config();

const server = new Server();

server.listen();