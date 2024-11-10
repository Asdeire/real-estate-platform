const express = require('express');
const userRoutes = require('./src/presentation/routes/userRoutes');
const propertyRoutes = require('./src/presentation/routes/propertyRoutes');
const listingRoutes = require('./src/presentation/routes/listingRoutes');
const { specs } = require('./src/presentation/routes/swagger'); 

const swaggerUi = require('swagger-ui-express');


const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Registering routes
app.use(userRoutes);
app.use(propertyRoutes);
app.use(listingRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Basic health check route
app.get('/', (req, res) => {
  res.send('Real Estate Platform API is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Swagger docs available at http://localhost:3000/api-docs');
});