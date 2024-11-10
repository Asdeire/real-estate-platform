const { PrismaClient } = require('@prisma/client');
const IListingRepository = require('../../domain/interfaces/IListingRepository');
const prisma = new PrismaClient();

class ListingRepository extends IListingRepository {
  async create(listing) {
    return prisma.listing.create({ data: listing });
  }

  async findById(id) {
    return prisma.listing.findUnique({ where: { id: Number(id) } });
  }

  async update(id, data) {
    return prisma.listing.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return prisma.listing.delete({ where: { id: Number(id) } });
  }

  async findAll(filter) {
    return prisma.listing.findMany({ where: filter });
  }
}

module.exports = ListingRepository;
