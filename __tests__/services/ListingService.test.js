const ListingService = require('../../src/application/services/ListingService');
const ListingRepository = require('../../src/infrastructure/repositories/ListingRepository');

jest.mock('../../src/infrastructure/repositories/ListingRepository');

describe('ListingService', () => {
    let listingService;
    let mockListingRepository;
    
    beforeEach(() => {
        mockListingRepository = new ListingRepository();
        listingService = new ListingService(mockListingRepository);
    });

    it('should create a new listing', async () => {
        const listingData = {
            userId: 1,
            propertyId: 2,
            price: 50000,
            description: 'Spacious 2-bedroom apartment',
        };

        const createdListing = { id: 1, ...listingData };

        mockListingRepository.create.mockResolvedValue(createdListing);

        const result = await listingService.createListing(listingData);

        expect(mockListingRepository.create).toHaveBeenCalledWith(listingData);
        expect(result).toEqual(createdListing);
    });

    it('should update a listing', async () => {
        const listingId = 1;
        const updatedData = { price: 55000 };
        const updatedListing = { id: listingId, userId: 1, propertyId: 2, ...updatedData };

        mockListingRepository.update.mockResolvedValue(updatedListing);

        const result = await listingService.updateListing(listingId, updatedData);

        expect(mockListingRepository.update).toHaveBeenCalledWith(listingId, updatedData);
        expect(result).toEqual(updatedListing);
    });

    it('should delete a listing', async () => {
        const listingId = 1;

        mockListingRepository.delete.mockResolvedValue();

        await listingService.deleteListing(listingId);

        expect(mockListingRepository.delete).toHaveBeenCalledWith(listingId);
    });

    it('should get a listing by id', async () => {
        const listingId = 1;
        const listing = { id: listingId, userId: 1, propertyId: 2, price: 50000, description: 'Spacious 2-bedroom apartment' };

        mockListingRepository.findById.mockResolvedValue(listing);

        const result = await listingService.getListingById(listingId);

        expect(mockListingRepository.findById).toHaveBeenCalledWith(listingId);
        expect(result).toEqual(listing);
    });

    it('should get all listings', async () => {
        const filter = { status: 'available' };
        const listings = [
            { id: 1, userId: 1, propertyId: 2, price: 50000, description: 'Spacious apartment', status: 'available' },
            { id: 2, userId: 2, propertyId: 3, price: 60000, description: 'Luxury apartment', status: 'available' }
        ];

        mockListingRepository.findAll.mockResolvedValue(listings);

        const result = await listingService.getAllListings(filter);

        expect(mockListingRepository.findAll).toHaveBeenCalledWith(filter);
        expect(result).toEqual(listings);
    });
});
