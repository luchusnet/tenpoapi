# TenpoApi - Challenge

Este es un prototipo para el challenge Tenpo
@Autor Luciano Benítez - benitezluciano@gmail.com

## GCP

El ambiente fué desplegado utilizando Terraform. El archivo de configuracion se encuentra en /gcp
ToDos: - Configurar un load balancer para poder brindar seguridad y definir un certificado ssl a nivel de balanceador. De esta form la vm dejará de tener ip publica.

## Backend API

El proyecto se realió utilizando loopback en su versión 3. Para acceder al mismo utilizar la siguiente url: http://35.225.85.152:3000/explorer/

### Features: 
          - Se implemetó el esquema MRS (Model/Repository/Service)
          - Se instaló módulo helmet csp para seguridad.
          - Se provee un swagger para la interacción. (solo disponible en ambientes devs y qas)
          - Se configuraron modulos de test de unidad con validación de cobertura (actualmente en 0 ya que no hay tests) pero disponible utilizando los scripts de package.json. 

### Servicios:

- POST /api/user/register: Este servicio permite el registro de un usuario. No valida email. 
- GET /api/user/{userId}/operations: Este servicio recupera las operaciones para un id de usuario.
- POST /api/api/user/login: Este servicio retorna un token de acceso que se utiliza para poder acceder a los servicios protegidos.
- POST /api//user/sum/{operandA}/{operandB}: Este servicio realiza la suma de dos valores númericos. Se requiere token de acceso.

Ejemplo de un request: http://35.225.85.152:3000/api/user/sum/1/2?access_token=r7KiH8xl7wFURcI0JEDn6OHINkj748TisY7MIz2it1UXK33BOy5P9hDFZwus3oVG

### Deployment

- Se debe crear una base en postgres llamada: tenpoapi. El esquema será creado en el la primera ejecución.
- Para la aplicación de api sobre la carpeta /app:
  -- npm install
  -- Definir la variable de entorno NODE_ENV (local o testing)
  -- npm .

### Docker builds

- Para la aplicacion api el Dockerfile esta en /app/Dockerfile
- Para la base de datos postgres /docker-compose/Dockerfile.

### CI / CD

Se utilizo docker compose tanto para la aplicación como para la base de datos.
- ToDos: Utilizar el servicio de pipeline de GCP con github para hacer un deploy automático cada vez que se realiza un commit a un branch especifico.
         https://github.com/marketplace/google-cloud-build
         Actualmente, se generan imagen localmente y se suben a Docker hub, luego se realiza un pull desde las instancias. 


