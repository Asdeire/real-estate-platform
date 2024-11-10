const PropertyRepository = require('../../infrastructure/repositories/PropertyRepository');

class PropertyService {
  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  /**
   * Create a new property
   * @param {object} propertyData - The property data
   * @returns {Promise<Property>}
   */
  async createProperty(propertyData) {
    return this.propertyRepository.create(propertyData);
  }

  /**
   * Find a property by ID
   * @param {number} id - The property ID
   * @returns {Promise<Property|null>}
   */
  async getPropertyById(id) {
    return this.propertyRepository.findById(id);
  }

  /**
   * Update property details
   * @param {number} id - The property ID
   * @param {object} data - The new property data
   * @returns {Promise<Property>}
   */
  async updateProperty(id, data) {
    return this.propertyRepository.update(id, data);
  }

  /**
   * Delete a property by ID
   * @param {number} id - The property ID
   * @returns {Promise<void>}
   */
  async deleteProperty(id) {
    return this.propertyRepository.delete(id);
  }

  /**
   * Find all properties matching filter
   * @param {object} filter - Filter criteria
   * @returns {Promise<Property[]>}
   */
  async getAllProperties(filter) {
    return this.propertyRepository.findAll(filter);
  }
}

module.exports = PropertyService;
