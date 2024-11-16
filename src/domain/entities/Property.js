class Property {
    constructor(id, title, description, location, price, listings = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
        this.listings = listings;
    }

    isValidPrice() {
        return typeof this.price === 'number' && this.price > 0;
    }

    addListing(listing) {
        this.listings.push(listing);
    }
}

module.exports = Property;
