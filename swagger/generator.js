const swaggerUi = require('swagger-ui-express');
const { generateTags, describeServer } = require('./util');
const generateDefinitions = require('./definitions');
const generatePaths = require('./paths/index');


const swagger = (config) => {
  const description = describeServer(config);
  const result = {
    swagger: '2.0',
    info: {
      // description: config.description || 'Rest api',
      version: config.version || '1.0.0',
      title: config.appName || 'Moser',
      host: config.host || 'http://localhost:3000',
      basePath: config.root || '/',
    },
    schemes: [
      'https',
      'http',
    ],
    tags: generateTags(config),
    paths: generatePaths(config),
    definitions: generateDefinitions(description),
    // securityDefinitions: {
    //   permissions: {
    //     type: 'apiKey',
    //     authorizationUrl: 'http://herd.fyi/auth/users/magic-link',
    //     in: 'header',
    //     scopes: {
    //       'email:verified': 'Email verified',
    //     },
    //   },
    // },
  };
  return JSON.parse(JSON.stringify(result));
};

const getMiddleware = swaggerDef => [
  swaggerUi.serve,
  swaggerUi.setup(swaggerDef),
];

module.exports = {
  swagger,
  getMiddleware,
};
