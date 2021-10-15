# CREA LA IMAGEN DE NODE QUE SE OCUPARA!!!
# Crear la imagen docker -t nombreImagen . (Nota: se debe estar en la caprta, si no, en vez del unto se debe especificar la ruta del documento)
# Ver la imagen : docker image
# Correr:  docker run -p 4000:3000 hellonode


#NOTA!!!!!!!!
#Para este en particular se creara con el siguiente comando
# docker-compose build -t whatsApp <---- Crea la imagen 
# Para CORRER el contenedor sera con lo siguiente siguiente
# docker run -it -p 8002:8001 whatsApp

FROM node:14

RUN apt-get update
RUN apt-get install nano

RUN apt-get install libvips-dev -y
RUN apt-get install -y libsecret-1-dev

# se crea la carpeta donde estaran los archivos de node
RUN mkdir -p /usr/src/app 

# Linea para decir que debe estar en esta carpeta al correr
WORKDIR /usr/src/app

# Copiar todos los archivos package dentro del contenedor en el directorio actual (o sea /usr/src/app)
# COPY package*.json ./
COPY package.json ./

# RUN npm config set unsafe-perm true
RUN rm -rf node_modules build
# RUN npm i
# RUN npm install --unsafe-perm

# Crea los modulos dentro del contenedor
# RUN npm cache clean --force

RUN npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
RUN npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
# RUN npm install sharp
RUN npm install --arch=x64 --platform=linux sharp

RUN npm i -g nodemon
RUN npm i -g typescript

# RUN npm config set strict-ssl false

# RUN npm i sharp --unsafe-perm
RUN npm i puppeteer
RUN npm i whatsapp-web.js
RUN npm i bcryptjs
RUN npm i cors
RUN npm i dotenv
RUN npm i express
RUN npm i mysql2
RUN npm i qrcode-terminal
RUN npm i sequelize
RUN npm i socket.io
RUN npm i tedious

RUN npm i @types/bcryptjs --save-dev
RUN npm i @types/cors --save-dev
RUN npm i @types/express --save-dev
RUN npm i @types/qrcode-terminal --save-dev

RUN npm i nodemon --save-dev
RUN npm i tslint --save-dev
RUN npm i typescript --save-dev

# RUN npm install

# Copia la carpeta src dentro del directorio 
# COPY src ./

# Copia el directorio actual dentro del directorio actual 
COPY . .

# Expone el puerto 3000 
EXPOSE 8002

# USER pptruser
# CMD ["google-chrome-stable"]
CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
# CMD [ "npm", "nodemon"]
# CMD ["nodemon", "src/index.js"]