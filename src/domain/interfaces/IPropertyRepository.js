class IPropertyRepository {
    /**
     * Creates a new Property object
     * @param {Property} property
     * @returns {Promise<Property>}
     */
    create(property) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Finds a Property by its ID
     * @param {number} id
     * @returns {Promise<Property|null>}
     */
    findById(id) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Updates a Property by its ID
     * @param {number} id
     * @param {object} data - new data for update
     * @returns {Promise<Property>}
     */
    update(id, data) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Deletes a Property by its ID
     * @param {number} id
     * @returns {Promise<void>}
     */
    delete(id) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Finds all Properties matching specific criteria
     * @param {object} filter
     * @returns {Promise<Property[]>}
     */
    findAll(filter) {
      throw new Error('Method not implemented');
    }
  }
  
  module.exports = IPropertyRepository;
  