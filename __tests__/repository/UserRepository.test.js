const { PrismaClient } = require('@prisma/client');
const UserRepository = require('../../src/infrastructure/repositories/UserRepository');

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        user: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('UserRepository', () => {
    let userRepository;
    let mockPrisma;

    beforeEach(() => {
        userRepository = new UserRepository();
        mockPrisma = new PrismaClient();
    });

    it('should create a new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        const createdUser = { id: 1, ...userData };

        mockPrisma.user.create.mockResolvedValue(createdUser);

        const result = await userRepository.create(userData);

        expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: userData });
        expect(result).toEqual(createdUser);
    });

    it('should find a user by ID', async () => {
        const userId = 1;
        const user = {
            id: userId,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        mockPrisma.user.findUnique.mockResolvedValue(user);

        const result = await userRepository.findById(userId);

        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } });
        expect(result).toEqual(user);
    });

    it('should find a user by email', async () => {
        const userEmail = 'john@example.com';
        const user = {
            id: 1,
            name: 'John Doe',
            email: userEmail,
            password: 'password123',
        };

        mockPrisma.user.findUnique.mockResolvedValue(user);

        const result = await userRepository.findByEmail(userEmail);

        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: userEmail } });
        expect(result).toEqual(user);
    });

    it('should update a user', async () => {
        const userId = 1;
        const updatedData = { name: 'Jane Doe', password: 'newpassword123' };
        const updatedUser = { id: userId, ...updatedData };

        mockPrisma.user.update.mockResolvedValue(updatedUser);

        const result = await userRepository.update(userId, updatedData);

        expect(mockPrisma.user.update).toHaveBeenCalledWith({ where: { id: userId }, data: updatedData });
        expect(result).toEqual(updatedUser);
    });

    it('should delete a user', async () => {
        const userId = 1;

        mockPrisma.user.delete.mockResolvedValue();

        await userRepository.delete(userId);

        expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: userId } });
    });

    it('should find all users matching filter', async () => {
        const filter = { name: 'John' };
        const users = [
            { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
            { id: 2, name: 'John Smith', email: 'john.smith@example.com', password: 'password123' },
        ];

        mockPrisma.user.findMany.mockResolvedValue(users);

        const result = await userRepository.findAll(filter);

        expect(mockPrisma.user.findMany).toHaveBeenCalledWith({ where: filter });
        expect(result).toEqual(users);
    });
});
