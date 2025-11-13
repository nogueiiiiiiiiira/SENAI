
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calculateAge } = require('../utils/validation');

const cpfExists = async (cpf) => !!await prisma.reader.findFirst({ where: { cpf } });

const idExists = async (idLivro) => !!await prisma.book.findUnique({ where: { id: Number(idLivro) } });

const addLoan = async (cpf, nomeLeitor, idLivro, nomeLivro, dataEmp, dataDev, statusEmp) => {
  if (!await cpfExists(cpf)) throw new Error('CPF não foi encontrado no banco de dados. Não foi possível realizar o empréstimo');
  if (!await idExists(idLivro)) throw new Error('Livro não foi encontrado no banco de dados. Não foi possível realizar o empréstimo');

  const reader = await prisma.reader.findFirst({ where: { cpf } });
  const book = await prisma.book.findUnique({ where: { id: Number(idLivro) } });

  if (calculateAge(reader.dataNasc) < book.classificacaoIdade) throw new Error('O leitor não tem idade suficiente para emprestar este livro');

  if (!await updateStock(idLivro)) throw new Error('Não há estoque suficiente para realizar o empréstimo');

  return prisma.loan.create({ data: { cpf, nomeLeitor, idLivro, nomeLivro, dataEmp, dataDev, statusEmp } });
};

const updateStock = async (idLivro) => {
  const existingBook = await prisma.book.findUnique({ where: { id: Number(idLivro) } });
  if (!existingBook || parseInt(existingBook.estoque) <= 0) return false;

  const updatedStock = parseInt(existingBook.estoque) - 1;
  await prisma.book.update({ where: { id: Number(existingBook.id) }, data: { estoque: updatedStock.toString() } });
  return true;
};

const listLoans = () => prisma.loan.findMany();

const listLoanById = (id) => prisma.loan.findUnique({ where: { id: Number(id) } });

const listLoanBySearch = (search) => prisma.loan.findMany({
  where: {
    OR: [
      { id: isNaN(search) ? undefined : Number(search) },
      { idLivro: Number(search) },
      { cpf: { contains: search } }
    ]
  }
});

const updateLoanService = (id, cpf, idLivro) => prisma.loan.update({ where: { id: Number(id) }, data: { cpf, idLivro } });

const deleteLoanService = (id) => prisma.loan.delete({ where: { id: Number(id) } });

const getReaderAndBookNames = async (cpf, idLivro) => {
  const reader = await prisma.reader.findFirst({ where: { cpf } });
  if (!reader) throw new Error('CPF não foi encontrado no banco de dados.');

  const book = await prisma.book.findUnique({ where: { id: Number(idLivro) } });
  if (!book) throw new Error('Livro não foi encontrado no banco de dados.');

  return { nomeLeitor: reader.nome, nomeLivro: book.nome };
};

module.exports = { addLoan, listLoans, listLoanBySearch, updateLoanService, deleteLoanService, listLoanById, updateStock, getReaderAndBookNames };
