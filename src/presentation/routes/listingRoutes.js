const express = require('express');
const ListingService = require('../../application/services/ListingService');
const router = express.Router();

const listingService = new ListingService();

// Route to get all listings
/**
 * @swagger
 * /listings:
 *   get:
 *     summary: Get all listings
 *     description: Retrieves a list of all listings on the platform.
 *     responses:
 *       200:
 *         description: A list of listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   propertyId:
 *                     type: integer
 *                   price:
 *                     type: number
 *                   listingType:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/listings', async (req, res) => {
  try {
    const listings = await listingService.getAllListings();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a new listing
/**
 * @swagger
 * /listings:
 *   post:
 *     summary: Create a new listing
 *     description: Adds a new property listing to the platform.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - price
 *               - listingType
 *             properties:
 *               propertyId:
 *                 type: integer
 *               price:
 *                 type: number
 *               listingType:
 *                 type: string
 *                 enum: [rent, sale]
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 propertyId:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 listingType:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post('/listings', async (req, res) => {
  try {
    const listing = await listingService.createListing(req.body);
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a listing by ID
/**
 * @swagger
 * /listings/{id}:
 *   get:
 *     summary: Get a listing by ID
 *     description: Retrieves the details of a listing by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the listing to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Listing found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 propertyId:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 listingType:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 */
router.get('/listings/:id', async (req, res) => {
  try {
    const listing = await listingService.getListingById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update listing details
/**
 * @swagger
 * /listings/{id}:
 *   put:
 *     summary: Update a listing's details
 *     description: Updates the details of a listing by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the listing to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               listingType:
 *                 type: string
 *                 enum: [rent, sale]
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 */
router.put('/listings/:id', async (req, res) => {
  try {
    const updatedListing = await listingService.updateListing(req.params.id, req.body);
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a listing
/**
 * @swagger
 * /listings/{id}:
 *   delete:
 *     summary: Delete a listing by ID
 *     description: Deletes a listing from the platform by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the listing to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Listing deleted successfully
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 */
router.delete('/listings/:id', async (req, res) => {
  try {
    await listingService.deleteListing(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
