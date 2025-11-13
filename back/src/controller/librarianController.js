const {
  login,
  addLibrarian,
  listLibrarians,
  listLibrarianBySearch,
  updateLibrarianService,
  deleteLibrarianService,
  listLibrarianById
} = require("../service/librarianService");

const jwt = require('jsonwebtoken');

async function getLibrarians(req, res) {
  const librarians = await listLibrarians();
  return librarians.length > 0 ? res.status(200).json(librarians) : res.status(204).send();
}

async function getLibrarianBySearch(req, res) {
  const { librarianSearch } = req.params;
  if (!librarianSearch) return res.status(400).json({ message: 'Inserção é obrigatório.' });

  const result = await listLibrarianBySearch(librarianSearch);
  return result?.length > 0 ? res.status(200).json(result) : res.status(404).json({ message: 'Nada foi encontrado.' });
}

async function postLibrarian(req, res) {
  const { nome, cpf, email, telefone, dataNasc, senha } = req.body;

  const dateParts = dataNasc.split('/');
  if (dateParts.length !== 3) {
    return res.status(400).json({ message: 'Formato de data inválido. Use o formato DD/MM/YYYY.' });
  }

  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const year = parseInt(dateParts[2]);

  const isValidDate = !isNaN(day) && !isNaN(month) && !isNaN(year);
  if (!isValidDate) {
    return res.status(400).json({ message: 'Data de nascimento inválida.' });
  }

  const birthDate = new Date(year, month, day);
  if (isNaN(birthDate.getTime())) {
    return res.status(400).json({ message: 'Data de nascimento inválida.' });
  }

  const formattedDate = birthDate.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  try {
    const createdLibrarian = await addLibrarian(nome, cpf, email, telefone, formattedDate, senha, new Date().toLocaleDateString('pt-BR'));
    return res.status(201).json({ message: 'Bibliotecário adicionado com sucesso.', data: createdLibrarian });
  } catch (error) {
    if (error.message === 'CPF já existe!') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Email já existe!') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Telefone já existe!') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro ao adicionar bibliotecário.' });
  }
}

async function postLogin(req, res) {
  let responseSent = false;
  try {
    const { email, senha } = req.body;
    const librarian = await login(email, senha);
    const secretKey = process.env.SECRET_KEY || 'default_secret_key';
    const token = jwt.sign({ librarian }, secretKey, { expiresIn: '1h' });
    if (!responseSent) {
      res.json({ token });
      responseSent = true;
    }
  } catch (error) {
    console.log(`Login failed: ${error.message}`);
    if (!responseSent) {
      res.status(401).json({ error: error.message });
      responseSent = true;
    }
  }
}

async function updateLibrarian(req, res) {
  const { nome, cpf, email, telefone, dataNasc, senha } = req.body;
  const { librarianId } = req.params;
  if (!nome || !cpf || !email || !telefone || !dataNasc || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }
  try {
      const existingLibrarian = await listLibrarianById(librarianId);
      if (!existingLibrarian) {
          return res.status(404).json({ message: 'Bibliotecário não encontrado.' });
      }
      const updateLibrarian = await updateLibrarianService(librarianId, nome, cpf, email, telefone, dataNasc, senha);
      return res.status(200).json(updateLibrarian);
  } catch (error) {
      console.error('Erro ao atualizar bibliotecário:', error);
      return res.status(500).json({ message: 'Erro ao atualizar bibliotecário.' });
  }
}

async function deleteLibrarian(req, res) {
  const { librarianId } = req.params;
  try {
      const existingLibrarian = await listLibrarianById(librarianId);
      if (!existingLibrarian) {
          return res.status(404).json({ message: 'Bibliotecário não encontrado.' });
      }
      await deleteLibrarianService(librarianId);
      return res.status(200).json({ message: 'Bibliotecário excluído com sucesso.' });
  } catch (error) {
      console.error('Erro ao deletar bibliotecário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

async function logout(req, res) {
  res.clearCookie('jwt');
  res.json({ message: 'Logout realizado com sucesso' });
}

module.exports = { getLibrarians, getLibrarianBySearch, postLibrarian, updateLibrarian, deleteLibrarian, postLogin, logout };
