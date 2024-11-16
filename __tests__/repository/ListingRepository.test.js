const { PrismaClient } = require('@prisma/client');
const ListingRepository = require('../../src/infrastructure/repositories/ListingRepository');

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        listing: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('ListingRepository', () => {
    let listingRepository;
    let mockPrisma;

    beforeEach(() => {
        listingRepository = new ListingRepository();
        mockPrisma = new PrismaClient();
    });

    it('should create a new listing', async () => {
        const listingData = {
            userId: 1,
            propertyId: 2,
            price: 50000,
            description: 'Spacious 2-bedroom apartment',
            status: 'available',
        };

        const createdListing = { id: 1, ...listingData };

        mockPrisma.listing.create.mockResolvedValue(createdListing);

        const result = await listingRepository.create(listingData);

        expect(mockPrisma.listing.create).toHaveBeenCalledWith({ data: listingData });
        expect(result).toEqual(createdListing);
    });

    it('should find a listing by id', async () => {
        const listingId = 1;
        const listing = {
            id: listingId,
            userId: 1,
            propertyId: 2,
            price: 50000,
            description: 'Spacious 2-bedroom apartment',
            status: 'available',
        };

        mockPrisma.listing.findUnique.mockResolvedValue(listing);

        const result = await listingRepository.findById(listingId);

        expect(mockPrisma.listing.findUnique).toHaveBeenCalledWith({ where: { id: listingId } });
        expect(result).toEqual(listing);
    });

    it('should update a listing', async () => {
        const listingId = 1;
        const updatedData = { price: 55000, status: 'sold' };
        const updatedListing = { id: listingId, userId: 1, propertyId: 2, ...updatedData };

        mockPrisma.listing.update.mockResolvedValue(updatedListing);

        const result = await listingRepository.update(listingId, updatedData);

        expect(mockPrisma.listing.update).toHaveBeenCalledWith({ where: { id: listingId }, data: updatedData });
        expect(result).toEqual(updatedListing);
    });

    it('should delete a listing', async () => {
        const listingId = 1;

        mockPrisma.listing.delete.mockResolvedValue();

        await listingRepository.delete(listingId);

        expect(mockPrisma.listing.delete).toHaveBeenCalledWith({ where: { id: listingId } });
    });

    it('should find all listings matching filter', async () => {
        const filter = { status: 'available' };
        const listings = [
            { id: 1, userId: 1, propertyId: 2, price: 50000, description: 'Spacious apartment', status: 'available' },
            { id: 2, userId: 2, propertyId: 3, price: 60000, description: 'Luxury apartment', status: 'available' },
        ];

        mockPrisma.listing.findMany.mockResolvedValue(listings);

        const result = await listingRepository.findAll(filter);

        expect(mockPrisma.listing.findMany).toHaveBeenCalledWith({ where: filter });
        expect(result).toEqual(listings);
    });
});
