const { PrismaClient } = require('@prisma/client');
const IUserRepository = require('../../domain/interfaces/IUserRepository');
const prisma = new PrismaClient();

class UserRepository extends IUserRepository {
  async create(user) {
    return prisma.user.create({ data: user });
  }

  async findById(id) {
    return prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async update(id, data) {
    return prisma.user.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return prisma.user.delete({ where: { id: Number(id) } });
  }

  async findAll(filter) {
    return prisma.user.findMany({ where: filter });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }
}

module.exports = UserRepository;
