const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { checkUniqueness } = require('../utils/validation');

const addReader = async (nome, cpf, email, telefone, dataNasc, criadoEm) => {
  await checkUniqueness('cpf', cpf);
  await checkUniqueness('email', email);
  await checkUniqueness('telefone', telefone);
  return prisma.reader.create({ data: { nome, cpf, email, telefone, dataNasc, criadoEm } });
};

const listReaders = () => prisma.reader.findMany();

const listReaderById = (id) => prisma.reader.findUnique({ where: { id: Number(id) } });

const listReaderBySearch = (cpf) => prisma.reader.findMany({ where: { cpf: { equals: cpf } } });

const updateReaderService = (id, nome, cpf, email, telefone, dataNasc) =>
  prisma.reader.update({ where: { id: Number(id) }, data: { nome, cpf, email, telefone, dataNasc } });

const deleteReaderService = (id) => prisma.reader.delete({ where: { id: Number(id) } });

module.exports = { addReader, listReaders, listReaderBySearch, updateReaderService, deleteReaderService, listReaderById };
