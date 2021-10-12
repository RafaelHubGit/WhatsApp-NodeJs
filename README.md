## Envio de mensajes desde WhatsApp

## Instalacion
npm install 

## Uso

# Correr desde la carpeta dist/app.js
node app.js
nodemon app.js

## http
Se debe realizar una peticion http 

# Conectar con una cuenta de whatsApp 
Get localhost:8001/api/whatsApp
Para obtener el codigo QR el cual se debe escanear desde el celular

# Enviar mensajes
POST localhost:8001/api/whatsApp
body: {
    "numero": "5512345678",
    "mensaje": "prueba de mensaje "
}
