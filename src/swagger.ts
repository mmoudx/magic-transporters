import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Magic Transporters API',
      version: '1.0.0',
      description: 'API documentation for the Magic Transporters project',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      schemas: {
        MagicMover: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Mover 1'
            },
            weightLimit: {
              type: 'number',
              example: 100
            },
            questState: {
              type: 'string',
              enum: ['resting', 'loading', 'on-mission'],
              example: 'resting'
            },
            completedMissions: {
              type: 'number',
              example: 0
            },
            loadedItems: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  item: {
                    type: 'string',
                    example: 'item1'
                  },
                  quantity: {
                    type: 'number',
                    example: 2
                  }
                }
              }
            }
          }
        },
        MagicItem: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Magic Wand'
            },
            weight: {
              type: 'number',
              example: 10
            }
          }
        }
      }
    },
  },
  apis: ['./src/routes/*.ts'], // Adjust the path according to your project structure
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
