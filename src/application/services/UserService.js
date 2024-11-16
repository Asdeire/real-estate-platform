const UserRepository = require('../../infrastructure/repositories/UserRepository');

class UserService {
  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  /**
   * Create a new user
   * @param {object} userData - The user data
   * @returns {Promise<User>}
   */
  async createUser(userData) {
    return this.userRepository.create(userData);
  }

  /**
   * Find a user by ID
   * @param {number} id - The user ID
   * @returns {Promise<User|null>}
   */
  async getUserById(id) {
    return this.userRepository.findById(id);
  }

  /**
   * Update user details
   * @param {number} id - The user ID
   * @param {object} data - The new user data
   * @returns {Promise<User>}
   */
  async updateUser(id, data) {
    return this.userRepository.update(id, data);
  }

  /**
   * Delete a user by ID
   * @param {number} id - The user ID
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    return this.userRepository.delete(id);
  }

  /**
   * Find all users matching filter
   * @param {object} filter - Filter criteria
   * @returns {Promise<User[]>}
   */
  async getAllUsers(filter) {
    return this.userRepository.findAll(filter);
  }

  /**
   * Find a user by email
   * @param {string} email - The user email
   * @returns {Promise<User|null>}
   */
  async getUserByEmail(email) {
    return this.userRepository.findByEmail(email);
  }
}

module.exports = UserService;
