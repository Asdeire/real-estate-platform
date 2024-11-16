const { PrismaClient } = require('@prisma/client');
const PropertyRepository = require('../../src/infrastructure/repositories/PropertyRepository');

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        property: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('PropertyRepository', () => {
    let propertyRepository;
    let mockPrisma;

    beforeEach(() => {
        propertyRepository = new PropertyRepository();
        mockPrisma = new PrismaClient();
    });

    it('should create a new property', async () => {
        const propertyData = {
            title: 'Modern Apartment',
            description: 'A beautiful apartment in the city center.',
            location: 'Kyiv',
            price: 100000,
        };

        const createdProperty = { id: 1, ...propertyData };

        mockPrisma.property.create.mockResolvedValue(createdProperty);

        const result = await propertyRepository.create(propertyData);

        expect(mockPrisma.property.create).toHaveBeenCalledWith({ data: propertyData });
        expect(result).toEqual(createdProperty);
    });

    it('should find a property by ID', async () => {
        const propertyId = 1;
        const property = {
            id: propertyId,
            title: 'Modern Apartment',
            description: 'A beautiful apartment in the city center.',
            location: 'Kyiv',
            price: 100000,
        };

        mockPrisma.property.findUnique.mockResolvedValue(property);

        const result = await propertyRepository.findById(propertyId);

        expect(mockPrisma.property.findUnique).toHaveBeenCalledWith({ where: { id: propertyId } });
        expect(result).toEqual(property);
    });

    it('should update a property', async () => {
        const propertyId = 1;
        const updatedData = { title: 'Luxury Apartment', price: 120000 };
        const updatedProperty = { id: propertyId, ...updatedData };

        mockPrisma.property.update.mockResolvedValue(updatedProperty);

        const result = await propertyRepository.update(propertyId, updatedData);

        expect(mockPrisma.property.update).toHaveBeenCalledWith({ where: { id: propertyId }, data: updatedData });
        expect(result).toEqual(updatedProperty);
    });

    it('should delete a property', async () => {
        const propertyId = 1;

        mockPrisma.property.delete.mockResolvedValue();

        await propertyRepository.delete(propertyId);

        expect(mockPrisma.property.delete).toHaveBeenCalledWith({ where: { id: propertyId } });
    });

    it('should find all properties matching filter', async () => {
        const filter = { location: 'Kyiv' };
        const properties = [
            { id: 1, title: 'Modern Apartment', description: 'A beautiful apartment in the city center.', location: 'Kyiv', price: 100000 },
            { id: 2, title: 'Cozy Apartment', description: 'A cozy apartment near the park.', location: 'Kyiv', price: 90000 },
        ];

        mockPrisma.property.findMany.mockResolvedValue(properties);

        const result = await propertyRepository.findAll(filter);

        expect(mockPrisma.property.findMany).toHaveBeenCalledWith({ where: filter });
        expect(result).toEqual(properties);
    });
});
