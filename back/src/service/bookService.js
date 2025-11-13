const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bookExists = async (title, autor, categoria) => !!await prisma.book.findFirst({ where: { nome: title, autor, categoria } });

const updateStock = async (nome, autor, categoria, quantidade) => {
  const existingBook = await prisma.book.findFirst({ where: { nome, autor, categoria } });
  if (!existingBook) throw new Error('Livro não encontrado');

  const updatedStock = parseInt(existingBook.estoque) + parseInt(quantidade);
  return prisma.book.update({ where: { id: existingBook.id }, data: { estoque: updatedStock.toString() } });
};

const addBook = async (nome, descricao, autor, categoria, estoque, classificacaoIdade, criadoEm) => {
  if (await bookExists(nome, autor, categoria)) throw new Error('Esse livro já existe! Livro adicionado ao estoque!');
  return prisma.book.create({ data: { nome, descricao, autor, categoria, estoque, classificacaoIdade, criadoEm } });
};

const listBooks = () => prisma.book.findMany();

const listBookById = (id) => prisma.book.findUnique({ where: { id: isNaN(id) ? undefined : Number(id) } });

const listBookBySearch = (search) => prisma.book.findMany({
  where: {
    OR: [
      { id: isNaN(search) ? undefined : Number(search) },
      { nome: { contains: search } },
      { descricao: { contains: search } },
      { autor: { contains: search } },
      { categoria: { contains: search } }
    ]
  }
});

const updateBookService = (id, nome, descricao, autor, categoria, estoque, classificacaoIdade) =>
  prisma.book.update({ where: { id: Number(id) }, data: { nome, descricao, autor, categoria, estoque, classificacaoIdade } });

const deleteBookService = (id) => prisma.book.delete({ where: { id: Number(id) } });

module.exports = { addBook, listBooks, listBookBySearch, updateBookService, deleteBookService, updateStock, listBookById };
