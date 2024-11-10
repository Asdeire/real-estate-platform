class IListingRepository {
    /**
     * Creates a new Listing object
     * @param {Listing} listing
     * @returns {Promise<Listing>}
     */
    create(listing) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Finds a Listing by its ID
     * @param {number} id
     * @returns {Promise<Listing|null>}
     */
    findById(id) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Updates a Listing by its ID
     * @param {number} id
     * @param {object} data - new data for update
     * @returns {Promise<Listing>}
     */
    update(id, data) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Deletes a Listing by its ID
     * @param {number} id
     * @returns {Promise<void>}
     */
    delete(id) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Finds all Listings matching specific criteria
     * @param {object} filter
     * @returns {Promise<Listing[]>}
     */
    findAll(filter) {
      throw new Error('Method not implemented');
    }
  }
  
  module.exports = IListingRepository;
  