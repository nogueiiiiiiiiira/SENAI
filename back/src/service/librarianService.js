const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { checkUniqueness } = require('../utils/validation');

const addLibrarian = async (nome, cpf, email, telefone, dataNasc, senha, criadoEm) => {
  await checkUniqueness('cpf', cpf);
  await checkUniqueness('email', email);
  await checkUniqueness('telefone', telefone);

  const hashedSenha = await bcrypt.hash(senha, 10);
  return prisma.librarian.create({ data: { nome, cpf, email, telefone, dataNasc, senha: hashedSenha, criadoEm } });
};

const login = async (email, senha) => {
  const librarian = await prisma.librarian.findUnique({ where: { email } });
  if (!librarian) throw new Error('Bibliotecário não encontrado!');

  const isSenhaValid = await bcrypt.compare(senha, librarian.senha);
  if (!isSenhaValid) throw new Error('Senha incorreta!');

  return librarian;
};

const listLibrarians = () => prisma.librarian.findMany();

const listLibrarianById = (id) => prisma.librarian.findUnique({ where: { id: isNaN(id) ? undefined : Number(id) } });

const listLibrarianBySearch = (search) => prisma.librarian.findMany({
  where: {
    OR: [
      { id: isNaN(search) ? undefined : Number(search) },
      { cpf: { contains: search } },
      { email: { contains: search } },
      { telefone: { contains: search } },
      { senha: { contains: search } }
    ]
  }
});

const updateLibrarianService = (id, nome, cpf, email, telefone, dataNasc, senha) =>
  prisma.librarian.update({ where: { id: Number(id) }, data: { nome, cpf, email, telefone, dataNasc, senha } });

const deleteLibrarianService = (id) => prisma.librarian.delete({ where: { id: Number(id) } });

module.exports = { login, addLibrarian, listLibrarians, listLibrarianBySearch, updateLibrarianService, deleteLibrarianService, listLibrarianById };
