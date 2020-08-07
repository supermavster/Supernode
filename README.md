# Typescript Express Sequelize and Clean Architecture

> Node template (Typescript Express Sequelize TS and Repository)

[![github release version](https://img.shields.io/github/v/release/supermavster/supernode.svg?include_prereleases)](https://github.com/supermavster/supernode/releases/latest) [![npm version](https://img.shields.io/npm/v/@toast-ui/editor.svg)](https://www.npmjs.com/package/@toast-ui/editor) [![license](https://img.shields.io/github/license/supermavster/supernode.svg)](https://github.com/supermavster/supernode/blob/master/LICENSE) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/supermavster/supernode/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) [![code with hearth by Supermavster](https://img.shields.io/badge/%3C/%3E%20with%20%E2%99%A5%20by-Supermavster-ff1414.svg)](https://github.com/supermavster)


**¡Ya no necesita comenzar su proyecto backend desde cero!**

Este es un útil, estructurado y compatible stack o plantilla de backend para **NODE** hecha con las principales tecnologías como: Express, Sequelize, Jest y Node server utilizando TypeScript.

## 🚩 Table of Contents

- [Prerequisites](#-prerequisites)
- [Built with](#-built-with)
- [Installation](#-install-npm-packages)
- [Features](#-features)
- [Complements](#-complements)
- [Pull Request](#-pull-request)
- [Developers](#-developers)
- [License](#-license)


## 🔧 Prerequisites
Para poder utilizar este template, necesita tener instalado:
- Terminal
- NodeJS
- YARN
- Gestor de Base de datos
- Docker (Opcional)

## 📦 Built with
Este proyecto fue creado usando las siguientes tecnologias:
- NodeJS
- YARN
- Express
- Typescript
- Sequelize (and Sequelize TypeScript)
- Hapi/Boom
- Husky
- ESLint
- Prettier
- Nodemon or PM2
- HTTP Status Code
- Swagger
- Jest (in progress)

## Installation
Sigue los siguientes pasos para utilizar y construir tus proyectos con base en este stack:

### 1. Clone the template
Antes que nada realiza un **fork** de este repositorio en tú cuentua.

O bien, puedes clonarlo directamente:
```
git clone https://github.com/supermavster/supernode.git
```
### 2. Add environments files

Necesitas añadir las variables de entorno, las cuales nos permitiran conectarnos a las bases de datos ofrecidas por Sequelize.

Para esto un ejemplo de un archivo env en la carpeta `environment`; más especificoÑ `environment/.env.example`

```
cd environment
cp .env.example .env.local
```
Un ejemplo base del archivo `.env.local` seria:

```
##################
# Env File
##################

ENV=development
VERSION=1
PROJECT=supernode
SHORT_NAME=sn
LANGUAGE=es

#HOST DATA:
HOST=localhost
PORT=5000

## DATABASE DATA
# DEV
DEV_DB_USERNAME=root
DEV_DB_PASSWORD=secret
DEV_DB_NAME=test
DEV_DB_HOSTNAME=127.0.0.1
DEV_DB_SYSTEM=mysql
DEV_DB_PORT=33060

# TEST
CI_DB_USERNAME=root
CI_DB_PASSWORD=secret
CI_DB_NAME=test
CI_DB_HOSTNAME=127.0.0.1
CI_DB_SYSTEM=mysql
CI_DB_PORT=33060

# PROD
PROD_DB_USERNAME=root
PROD_DB_PASSWORD=secret
PROD_DB_NAME=test
PROD_DB_HOSTNAME=127.0.0.1
PROD_DB_SYSTEM=mysql
PROD_DB_PORT=33060

GMAIL_SERVICE_NAME=gmail
GMAIL_SERVICE_HOST='smtp.gmail.com'
GMAIL_SERVICE_SECURE=true
GMAIL_SERVICE_PORT=465
GMAIL_USER_NAME=correo@gmail.com
GMAIL_USER_PASSWORD=secret
```

### 3. Install NPM packages

Ahora necesitamos instalar las dependencias del proyecto, utilizando alguno de los siguientes comandos:
```
$ npm install
or 
$ yarn install
```

### 4. Run the app:
#### **Warning! Debe de ejecutarse la base de datos antes de proseguir**

Si utilizas **docker** te recomiendo que montes y ejecutes un volumen con mysql, más información: [Docker + MySQL (Tutorial)](https://platzi.com/tutoriales/1432-docker/3268-como-crear-un-contenedor-con-docker-mysql-y-persistir-la-informacion/), despues de crear el volumen ejecutar el id o nombre del contenedor: `docker start be04f0c06...`

Solo ejecutar el comando:
```
npm run serve:[ENVIRONMENT_NAME]

o

yarn serve:[ENVIRONMENT_NAME]
```

Un ejemplo de esto en local, seria:

```
npm run serve:local

o

yarn serve:local
```

La plantilla admite cuatro entornos, puede modificarlos desde pakcage.json > scripts
npm install. Por ejemplo, ejecute la plantilla `npm run serve:local`, para ejecutar la aplicación utilizando el modo de entorno local.

## 🎨 Features
- Ejemplo completo de llamada API (para que pueda rastrearlo y saber cómo funciona el ciclo de vida de la llamada API).
- Uso de Typescript.
- Configurar entorno de prueba utilizando pruebas Jest con informes de cobertura. (In Progress)
- Estructura: Controlador, Servicio, Repositorio y Modelo.
- Validación de modelos de bases de datos.
- Eslint linting, Pettrier y Babel.
- Corrección automática para errores de linting antes de confirmar cambios.
- Soporte de múltiples entornos.
- Soporte de múlti lenguaje.
- Un lugar para manejar errores.
- Manejo de errores usando el módulo Hapi / Boom (errores consistentes y estructurados).
- Manejo de Interfaces

**Nota:** Se puede extender a más idiomas y escalar.

## Complements

### Generate Migrations and Seeders
```
npx sequelize seed:generate --name 
npx sequelize migration:generate --name 
```
#### Ejemplo:
```
# Migration
npx sequelize migration:generate --name Project

# Seeders
npx sequelize seed:generate --name Project
```


### Structure Migrations

**Nombre de la tabla:** *Platform*
**Parametro de la tabla:** *name*

```
'use strict';

// Don't Touch!!
const path = require('path');

const directoryOfFile = path.join(
  path.join(__dirname, '../../config/migrations.js')
);
const {tableDB, getTableDB, schemaDB} = require(directoryOfFile);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      tableDB('platform'),
      schemaDB({
        name: {
          type: Sequelize.STRING
        }
      })
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(getTableDB());
  }
};

```

### Structure Seeder

**Nombre de la tabla:** *Platform*
**Data de la tabla:** *[{}]*

```
'use strict';

const table = 'platform';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Insert Data
    return queryInterface.bulkInsert(
      table,
      [
        {name: 'Android'},
        {name: 'IOs'},
        {name: 'Flutter'},
        {name: 'Web'},
        {name: 'Api'}
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};

```

### Run db

Ejecutar migraciones y Seeders:
```
npx sequelize-cli db:migrate  && npx sequelize-cli db:seed:all
```

### Run Server
Ejecutar el servidor localmente:
```
yarn serve:local
```

### Clean Code
Limpiar el código:
```
yarn clean:code
```

### Deploy

Para despliegue automatico crear una carpeta cert y añadir un archivo PEM

## Pull Request

Todo Feedback es bien recivido


## 🚀 Developers
| <img src="https://avatars3.githubusercontent.com/u/20430676?s=460&u=39d9c329b8fd8134c129b2b36fdf866fbab7b224&v=4" width="100" /> <br/> Miguel Ángel|
|---------------------------------------------------------------------------------------------------------------------|
| <div align="center"> <a href="https://github.com/supermavster"> <img src="https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png" width="30" /> </a> <a href="https://www.linkedin.com/in/miguel-angel-torres-vargas/"> <img src="https://freeiconshop.com/wp-content/uploads/edd/linkedin-flat.png" width="30" /> </a>                                                     |


## 📜 License

This software is licensed under the [MIT](https://github.com/supermavster/supernode/blob/master/LICENSE) © [Supermavster](https://github.com/supermavster).