const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cpfExists = async (cpf) => (await prisma.loan.findMany({ where: { cpf: { equals: cpf } } })).length > 0;

const idExists = async (idLivro) => !!await prisma.book.findUnique({ where: { id: Number(idLivro) } });

const addReturn = async (cpf, nomeLeitor, idLivro, nomeLivro, prevDev, dataAtual, multaAtribuida) => {
  if (!await cpfExists(cpf)) throw new Error('CPF não existe! Não foi possível realizar a devolução');
  if (!await idExists(idLivro)) throw new Error('Livro não existe! Não foi possível realizar a devolução');

  return prisma.return.create({ data: { cpf, nomeLeitor, idLivro, nomeLivro, prevDev, dataAtual, multaAtribuida } });
};

const updateStock = async (idLivro) => {
  const existingBook = await prisma.book.findUnique({ where: { id: Number(idLivro) } });
  if (!existingBook) throw new Error('Livro não encontrado!');

  const updatedStock = parseInt(existingBook.estoque) + 1;
  await prisma.book.update({ where: { id: existingBook.id }, data: { estoque: updatedStock.toString() } });
};

const listReturns = () => prisma.return.findMany();

const listReturnById = (id) => prisma.return.findUnique({ where: { id: Number(id) } });

const listReturnBySearch = (search) => typeof search === 'string' ? prisma.return.findMany({
  where: {
    OR: [
      { id: isNaN(search) ? undefined : Number(search) },
      { idLivro: Number(search) },
      { cpf: { contains: search } }
    ]
  }
}) : [];

const updateReturnService = (id, cpf, idLivro) => prisma.return.update({ where: { id: Number(id) }, data: { cpf, idLivro } });

const deleteReturnService = (id) => prisma.return.delete({ where: { id: Number(id) } });

const addFine = (cpf, nomeLeitor, idLivro, nomeLivro, diasAtra, total, statusPag, criadoEm) =>
  prisma.fine.create({ data: { cpf, nomeLeitor, idLivro, nomeLivro, diasAtra, total, statusPag, criadoEm } });

const updateLoan = async (idLivro, data) => {
  const loan = await prisma.loan.findFirst({ where: { idLivro: idLivro.toString() } });
  if (!loan) throw new Error('Empréstimo não encontrado');

  return prisma.loan.update({ where: { id: loan.id }, data: { statusEmp: data.statusDev || data.statusEmp } });
};

module.exports = { addReturn, listReturns, listReturnById, listReturnBySearch, updateReturnService, deleteReturnService, updateStock, addFine, updateLoan };
