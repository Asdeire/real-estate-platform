const express = require('express');
const PropertyService = require('../../application/services/PropertyService');
const router = express.Router();

const propertyService = new PropertyService();

// Route to get all properties
/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     description: Retrieves a list of all properties on the platform.
 *     responses:
 *       200:
 *         description: A list of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   location:
 *                     type: string
 *                   price:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get('/properties', async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a new property
/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     description: Adds a new property listing to the platform.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - location
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               bedrooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 location:
 *                   type: string
 *                 price:
 *                   type: number
 *       500:
 *         description: Server error
 */
router.post('/properties', async (req, res) => {
  try {
    const property = await propertyService.createProperty(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a property by ID
/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get a property by ID
 *     description: Retrieves the details of a property by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the property to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Property found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 location:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update property details
/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update a property's details
 *     description: Updates the details of a property by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the property to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               bedrooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.put('/properties/:id', async (req, res) => {
  try {
    const updatedProperty = await propertyService.updateProperty(req.params.id, req.body);
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a property
/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     description: Deletes a property from the platform by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the property to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Property deleted successfully
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.delete('/properties/:id', async (req, res) => {
  try {
    await propertyService.deleteProperty(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
