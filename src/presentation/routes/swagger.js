const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate API',
      version: '1.0.0',
      description: 'API для платформи нерухомості, що включає роботу з користувачами, власністю та оголошеннями.',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['./src/presentation/routes/*.js'], 
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = { specs };
