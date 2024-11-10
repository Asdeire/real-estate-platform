class IUserRepository {
    /**
     * Creates a new User object
     * @param {User} user
     * @returns {Promise<User>}
     */
    create(user) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Finds a User by their ID
     * @param {number} id
     * @returns {Promise<User|null>}
     */
    findById(id) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Updates a User by their ID
     * @param {number} id
     * @param {object} data - new data for update
     * @returns {Promise<User>}
     */
    update(id, data) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Deletes a User by their ID
     * @param {number} id
     * @returns {Promise<void>}
     */
    delete(id) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Finds all Users matching specific criteria
     * @param {object} filter
     * @returns {Promise<User[]>}
     */
    findAll(filter) {
      throw new Error('Method not implemented');
    }
  
    /**
     * Finds a User by their email
     * @param {string} email
     * @returns {Promise<User|null>}
     */
    findByEmail(email) {
      throw new Error('Method not implemented');
    }
  }
  
  module.exports = IUserRepository;
  