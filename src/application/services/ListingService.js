const ListingRepository = require('../../infrastructure/repositories/ListingRepository');

class ListingService {
  constructor() {
    this.listingRepository = new ListingRepository();
  }

  /**
   * Create a new listing
   * @param {object} listingData - The listing data
   * @returns {Promise<Listing>}
   */
  async createListing(listingData) {
    return this.listingRepository.create(listingData);
  }

  /**
   * Find a listing by ID
   * @param {number} id - The listing ID
   * @returns {Promise<Listing|null>}
   */
  async getListingById(id) {
    return this.listingRepository.findById(id);
  }

  /**
   * Update listing details
   * @param {number} id - The listing ID
   * @param {object} data - The new listing data
   * @returns {Promise<Listing>}
   */
  async updateListing(id, data) {
    return this.listingRepository.update(id, data);
  }

  /**
   * Delete a listing by ID
   * @param {number} id - The listing ID
   * @returns {Promise<void>}
   */
  async deleteListing(id) {
    return this.listingRepository.delete(id);
  }

  /**
   * Find all listings matching filter
   * @param {object} filter - Filter criteria
   * @returns {Promise<Listing[]>}
   */
  async getAllListings(filter) {
    return this.listingRepository.findAll(filter);
  }
}

module.exports = ListingService;
