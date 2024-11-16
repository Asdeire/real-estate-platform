const PropertyService = require('../../src/application/services/PropertyService');
const PropertyRepository = require('../../src/infrastructure/repositories/PropertyRepository');

jest.mock('../../src/infrastructure/repositories/PropertyRepository'); 

describe('PropertyService', () => {
    let propertyService;
    let mockPropertyRepository;

    beforeEach(() => {
        mockPropertyRepository = new PropertyRepository();
        propertyService = new PropertyService(mockPropertyRepository);
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should create a new property', async () => {
        const propertyData = {
            title: 'Modern Apartment',
            description: 'A beautiful apartment in the city center.',
            location: 'Kyiv',
            price: 100000,
        };
        const createdProperty = { id: 1, ...propertyData };

        mockPropertyRepository.create.mockResolvedValue(createdProperty);

        const result = await propertyService.createProperty(propertyData);

        expect(mockPropertyRepository.create).toHaveBeenCalledWith(propertyData);
        expect(result).toEqual(createdProperty);
    });

    it('should fetch a property by ID', async () => {
        const propertyId = 1;
        const property = {
            id: propertyId,
            title: 'Modern Apartment',
            description: 'A beautiful apartment in the city center.',
            location: 'Kyiv',
            price: 100000,
        };

        mockPropertyRepository.findById.mockResolvedValue(property);

        const result = await propertyService.getPropertyById(propertyId);

        expect(mockPropertyRepository.findById).toHaveBeenCalledWith(propertyId);
        expect(result).toEqual(property);
    });

    it('should update property details', async () => {
        const propertyId = 1;
        const updatedData = { title: 'Updated Apartment', price: 110000 };
        const updatedProperty = { id: propertyId, ...updatedData };

        mockPropertyRepository.update.mockResolvedValue(updatedProperty);

        const result = await propertyService.updateProperty(propertyId, updatedData);

        expect(mockPropertyRepository.update).toHaveBeenCalledWith(propertyId, updatedData);
        expect(result).toEqual(updatedProperty);
    });

    it('should delete a property by ID', async () => {
        const propertyId = 1;

        mockPropertyRepository.delete.mockResolvedValue();

        await propertyService.deleteProperty(propertyId);

        expect(mockPropertyRepository.delete).toHaveBeenCalledWith(propertyId);
    });

    it('should fetch all properties with a filter', async () => {
        const filter = { location: 'Kyiv' };
        const properties = [
            { id: 1, title: 'Apartment 1', location: 'Kyiv', price: 100000 },
            { id: 2, title: 'Apartment 2', location: 'Kyiv', price: 120000 },
        ];

        mockPropertyRepository.findAll.mockResolvedValue(properties);

        const result = await propertyService.getAllProperties(filter);

        expect(mockPropertyRepository.findAll).toHaveBeenCalledWith(filter);
        expect(result).toEqual(properties);
    });
});
