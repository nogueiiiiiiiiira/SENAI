const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cpfExists = async (cpf) => (await prisma.fine.findMany({ where: { cpf: { equals: cpf } } })).length > 0;

const idExists = async (idLivro) => await prisma.fine.findMany({ where: { idLivro } }) !== null;

const payFine = async (cpf, idLivro, statusPag) => {
  if (!await cpfExists(cpf)) throw new Error('CPF não existe! Não foi possível pagar a multa');
  if (!await idExists(idLivro)) throw new Error('Livro não existe! Não foi possível pagar a multa');

  try {
    return await prisma.fine.updateMany({ where: { cpf, idLivro }, data: { statusPag } });
  } catch (error) {
    throw new Error('Erro ao pagar a multa');
  }
};

const listFines = () => prisma.fine.findMany();

const listFineById = (id) => prisma.fine.findUnique({ where: { id: Number(id) } });

const listFineBySearch = (search) => prisma.fine.findMany({
  where: {
    OR: [
      { id: isNaN(search) ? undefined : Number(search) },
      { cpf: { contains: search } },
      { idLivro: Number(search) },
      { statusPag: { contains: search } }
    ]
  }
});

const updateFineService = (id, cpf, idLivro) => prisma.fine.update({ where: { id: Number(id) }, data: { cpf, idLivro } });

const deleteFineService = (id) => prisma.fine.delete({ where: { id: Number(id) } });

module.exports = { payFine, listFines, listFineById, listFineBySearch, updateFineService, deleteFineService };
