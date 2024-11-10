const { PrismaClient } = require('@prisma/client');
const IPropertyRepository = require('../../domain/interfaces/IPropertyRepository');
const prisma = new PrismaClient();

class PropertyRepository extends IPropertyRepository {
  async create(property) {
    return prisma.property.create({ data: property });
  }

  async findById(id) {
    return prisma.property.findUnique({ where: { id: Number(id) } });
  }

  async update(id, data) {
    return prisma.property.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return prisma.property.delete({ where: { id: Number(id) } });
  }

  async findAll(filter) {
    return prisma.property.findMany({ where: filter });
  }
}

module.exports = PropertyRepository;
