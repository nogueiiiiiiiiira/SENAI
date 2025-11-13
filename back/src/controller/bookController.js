const {
  addBook,
  updateStock,
  listBooks,
  listBookById,
  listBookBySearch,
  updateBookService,
  deleteBookService
} = require("../service/bookService");

async function getBooks(req, res) {
  const books = await listBooks();
  return books.length > 0 ? res.status(200).json(books) : res.status(204).send();
}

async function getBookBySearch(req, res) {
  const { bookSearch } = req.params;
  if (!bookSearch) {
    return res.status(400).json({ message: 'Inserção de busca é obrigatória' });
  }
  const result = await listBookBySearch(bookSearch);
  return result?.length > 0 ? res.status(200).json(result) : res.status(404).json({ message: 'Nada foi encontrado' });
}

async function postBook(req, res) {
  const { nome, descricao, autor, categoria, estoque, classificacaoIdade } = req.body;

  if (!nome || !descricao || !autor || !categoria || !estoque || !classificacaoIdade) {
    return res.status(400).json({ message: 'O preenchimento de todos os campos é obrigatório' });
  }

  try {
    const criadoEm = new Date().toLocaleDateString('pt-BR');
    await addBook(nome, descricao, autor, categoria, estoque, classificacaoIdade, criadoEm);
    return res.status(201).json({ message: 'Livro adicionado com sucesso' });
  } catch (error) {
    if (error.message === 'Esse livro já existe! Livro adicionado ao estoque!') {
      await updateStock(nome, autor, categoria, estoque);
      return res.status(200).json({ message: 'Livro já existente. Livros somente adicionados ao estoque' });
    }
    return res.status(500).json({ message: 'Erro ao adicionar o Livro' });
  }
}

async function updateBook(req, res) {
  const { nome, descricao, autor, categoria, estoque, classificacaoIdade } = req.body;
  const { bookId } = req.params;

  if (!nome || !descricao || !autor || !categoria || !estoque || !classificacaoIdade) {
    return res.status(400).json({ message: 'O preenchimento de todos os campos é obrigatório' });
  }

  try {
    const existingBook = await listBookById(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    const updatedBook = await updateBookService(bookId, nome, descricao, autor, categoria, estoque, classificacaoIdade);
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Erro ao atualizar o livro:', error);
    return res.status(500).json({ message: 'Erro ao atualizar o livro' });
  }
}

async function deleteBook(req, res) {
  const { bookId } = req.params;
  try {
    const existingBook = await listBookById(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    await deleteBookService(bookId);
    return res.status(200).json({ message: 'Livro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o livro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

module.exports = { getBooks, getBookBySearch, postBook, updateBook, deleteBook };
