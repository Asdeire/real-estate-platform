const UserService = require('../../src/application/services/UserService');
const UserRepository = require('../../src/infrastructure/repositories/UserRepository');

jest.mock('../../src/infrastructure/repositories/UserRepository'); 

describe('UserService', () => {
    let userService;
    let mockUserRepository;

    beforeEach(() => {
        mockUserRepository = new UserRepository();
        userService = new UserService(mockUserRepository);
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should create a new user', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        const createdUser = { id: 1, ...userData };

        mockUserRepository.create.mockResolvedValue(createdUser);

        const result = await userService.createUser(userData);

        expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
        expect(result).toEqual(createdUser);
    });

    it('should fetch a user by ID', async () => {
        const userId = 1;
        const user = { id: userId, name: 'John Doe', email: 'john@example.com' };

        mockUserRepository.findById.mockResolvedValue(user);

        const result = await userService.getUserById(userId);

        expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        expect(result).toEqual(user);
    });

    it('should update user details', async () => {
        const userId = 1;
        const updatedData = { name: 'Jane Doe' };
        const updatedUser = { id: userId, ...updatedData };

        mockUserRepository.update.mockResolvedValue(updatedUser);

        const result = await userService.updateUser(userId, updatedData);

        expect(mockUserRepository.update).toHaveBeenCalledWith(userId, updatedData);
        expect(result).toEqual(updatedUser);
    });

    it('should delete a user by ID', async () => {
        const userId = 1;

        mockUserRepository.delete.mockResolvedValue();

        await userService.deleteUser(userId);

        expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should fetch all users with a filter', async () => {
        const filter = { name: 'John Doe' };
        const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

        mockUserRepository.findAll.mockResolvedValue(users);

        const result = await userService.getAllUsers(filter);

        expect(mockUserRepository.findAll).toHaveBeenCalledWith(filter);
        expect(result).toEqual(users);
    });

    it('should fetch a user by email', async () => {
        const email = 'john@example.com';
        const user = { id: 1, name: 'John Doe', email };

        mockUserRepository.findByEmail.mockResolvedValue(user);

        const result = await userService.getUserByEmail(email);

        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual(user);
    });
});
