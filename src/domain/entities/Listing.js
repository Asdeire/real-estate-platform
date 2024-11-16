class Listing {
    constructor(id, userId, propertyId, price, description, status = 'available') {
        this.id = id;
        this.userId = userId;
        this.propertyId = propertyId;
        this.status = status;
    }

    isValidStatus() {
        const validStatuses = ['available', 'sold', 'rented'];
        return validStatuses.includes(this.status);
    }

    canBeUpdated() {
        return this.status === 'available';
    }
}

module.exports = Listing;
