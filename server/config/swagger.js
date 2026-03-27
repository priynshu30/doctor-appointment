const swaggerJsdoc = require('swagger-jsdoc');

const baseUrl =
  process.env.SWAGGER_SERVER_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  `http://localhost:${process.env.PORT || 5000}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Doctor Appointment API',
      version: '1.0.0',
      description:
        'API documentation for authentication, services, appointments, and file uploads.',
    },
    servers: [
      {
        url: baseUrl,
        description: 'Current server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Server error',
            },
          },
        },
        UserAuthRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'priya@example.com',
            },
            password: {
              type: 'string',
              example: 'Password123',
            },
          },
        },
        UserRegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password', 'contactNumber'],
          properties: {
            name: {
              type: 'string',
              example: 'Priya Sharma',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'priya@example.com',
            },
            password: {
              type: 'string',
              example: 'Password123',
            },
            contactNumber: {
              type: 'string',
              example: '9876543210',
            },
          },
        },
        UserProfile: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '6601f1d946b4fd7d7e8c1a01',
            },
            name: {
              type: 'string',
              example: 'Priya Sharma',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'priya@example.com',
            },
            contactNumber: {
              type: 'string',
              example: '9876543210',
            },
            profileImage: {
              type: 'string',
              example: '/uploads/image-1711111111111.png',
            },
            token: {
              type: 'string',
              example: 'jwt-token-here',
            },
          },
        },
        UpdateUserProfileRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Priya Sharma',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'priya@example.com',
            },
            contactNumber: {
              type: 'string',
              example: '9876543210',
            },
            profileImage: {
              type: 'string',
              example: '/uploads/image-1711111111111.png',
            },
            password: {
              type: 'string',
              example: 'NewPassword123',
            },
          },
        },
        AppointmentRequest: {
          type: 'object',
          required: ['date', 'time', 'doctorType'],
          properties: {
            date: {
              type: 'string',
              format: 'date-time',
              example: '2026-04-01T10:00:00.000Z',
            },
            time: {
              type: 'string',
              example: '10:30 AM',
            },
            doctorType: {
              type: 'string',
              example: 'Cardiologist',
            },
            additionalComments: {
              type: 'string',
              example: 'Follow-up consultation',
            },
            reports: {
              type: 'string',
              example: '/uploads/image-1711111111111.pdf',
            },
          },
        },
        Appointment: {
          allOf: [
            {
              $ref: '#/components/schemas/AppointmentRequest',
            },
            {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '6601f1d946b4fd7d7e8c1b01',
                },
                user: {
                  type: 'string',
                  example: '6601f1d946b4fd7d7e8c1a01',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                },
              },
            },
          ],
        },
        ServiceRequest: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            name: {
              type: 'string',
              example: 'Dental Care',
            },
            description: {
              type: 'string',
              example: 'Routine checkups and dental treatments.',
            },
            imageUrl: {
              type: 'string',
              example: 'https://example.com/service-image.jpg',
            },
          },
        },
        Service: {
          allOf: [
            {
              $ref: '#/components/schemas/ServiceRequest',
            },
            {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '6601f1d946b4fd7d7e8c1c01',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                },
              },
            },
          ],
        },
        UploadResponse: {
          type: 'string',
          example: '/uploads/image-1711111111111.pdf',
        },
      },
    },
    paths: {
      '/': {
        get: {
          tags: ['Health'],
          summary: 'Check API status',
          responses: {
            200: {
              description: 'API is running',
              content: {
                'text/plain': {
                  schema: {
                    type: 'string',
                    example: 'API is running...',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserRegisterRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User registered',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserProfile',
                  },
                },
              },
            },
            400: {
              description: 'User already exists or invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Authenticate a user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserAuthRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Authenticated user',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserProfile',
                  },
                },
              },
            },
            401: {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/profile': {
        get: {
          tags: ['Auth'],
          summary: 'Get the authenticated user profile',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Current user profile',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserProfile',
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ['Auth'],
          summary: 'Update the authenticated user profile',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdateUserProfileRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Updated profile',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserProfile',
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/services': {
        get: {
          tags: ['Services'],
          summary: 'Get all services',
          responses: {
            200: {
              description: 'List of services',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Service',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Services'],
          summary: 'Create a service',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ServiceRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Service created',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Service',
                  },
                },
              },
            },
          },
        },
      },
      '/api/appointments': {
        get: {
          tags: ['Appointments'],
          summary: 'Get appointments for the authenticated user',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'List of appointments',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Appointment',
                    },
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Appointments'],
          summary: 'Create an appointment',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AppointmentRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Appointment created',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Appointment',
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/upload': {
        post: {
          tags: ['Upload'],
          summary: 'Upload an image or PDF report',
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: ['image'],
                  properties: {
                    image: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Uploaded file path',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UploadResponse',
                  },
                },
              },
            },
            400: {
              description: 'No file uploaded',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
