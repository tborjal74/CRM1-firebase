const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require ('swagger-jsdoc');

// Path to service account key JSON file
const serviceAccount = require(path.join(__dirname, '../../crm1-e85dc-firebase-adminsdk-fbsvc-1a9ad4e13e.json'));

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

// Sample route
app.get('/api/test', (req, res) => {
	res.json({ message: 'Backend is working and connected to Firebase!' });
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});
const customerRoutes = require('./routes/customerRoutes');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM1 API',
      version: '1.0.0',
      description: 'API documentation for CRM1 backend',
    },
  },
  apis: [path.resolve(__dirname, 'routes/*.js')], // Path to route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/customers', customerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

