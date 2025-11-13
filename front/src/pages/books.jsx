import React, { useState, useEffect, memo, useCallback } from "react";
import Menu from "../components/Menu";
import { useBooks } from "../hooks/useBooks";
import { BOOK_CATEGORIES, MESSAGES } from "../utils/constants";
import { validateForm, bookValidationRules } from "../utils/validation";
import { formatNumber } from "../utils/formatters";
import FormField from "../components/FormField";
import ConfirmDialog from "../components/ConfirmDialog";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

export function Books() {
  const [content, setContent] = useState(null);

  const showList = useCallback(() => {
    setContent(<BookList showForm={showForm} />);
  }, []);

  const showForm = useCallback((book) => {
    setContent(<BookForm book={book} showList={showList} />);
  }, [showList]);

  useEffect(() => {
    showList();
  }, [showList]);

  return (
    <>
      <Menu />
      <div className="container my-5">
        {content}
      </div>
    </>
  );
}

const BookList = memo(({ showForm }) => {
  const { books, loading, error, fetchBooks, deleteBook } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks(searchTerm);
  }, [searchTerm, fetchBooks]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading && books.length === 0) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center mb-3">Lista de Livros</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button onClick={() => showForm({})} className="btn btn-primary" type="button">
          + Livro
        </button>
        <div className="flex-grow-1 ms-3">
          <input
            type="text"
            className="form-control"
            placeholder="Digite para pesquisar um livro..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center text-muted">
          Nenhum livro encontrado.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Classificação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td title={book.nome}>
                    {book.nome?.length > 20 ? `${book.nome.slice(0, 20)}...` : book.nome}
                  </td>
                  <td title={book.autor}>
                    {book.autor?.length > 20 ? `${book.autor.slice(0, 20)}...` : book.autor}
                  </td>
                  <td title={book.descricao}>
                    {book.descricao?.length > 30 ? `${book.descricao.slice(0, 30)}...` : book.descricao}
                  </td>
                  <td>{book.categoria}</td>
                  <td>{book.estoque}</td>
                  <td>{book.classificacaoIdade} anos</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button
                      onClick={() => showForm(book)}
                      className="btn btn-primary btn-sm me-2"
                      type="button"
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="btn btn-danger btn-sm"
                      type="button"
                      disabled={loading}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
});

BookList.displayName = 'BookList';

const BookForm = memo(({ book, showList }) => {
  const { createBook, updateBook, loading } = useBooks();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(book || {
    nome: '',
    autor: '',
    descricao: '',
    categoria: '',
    estoque: '',
    classificacaoIdade: '',
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const { nome, autor, descricao, categoria, estoque, classificacaoIdade } = formData;

    if (!nome?.trim() || !autor?.trim() || !descricao?.trim() || !categoria || !estoque || !classificacaoIdade) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setErrorMessage("");

    const success = book.id
      ? await updateBook(book.id, formData)
      : await createBook(formData);

    if (success) {
      showList();
    }
  }, [formData, book.id, createBook, updateBook, showList]);

  const categories = [
    "Autoajuda", "Biografia e Autobiografia", "Clássicos", "Desenvolvimento Pessoal",
    "Distopia", "Ficção Científica", "Fantasia", "História", "Juvenil",
    "Poesia", "Romance", "Suspense e Mistério"
  ];

  return (
    <>
      <h2 className="text-center mb-3">
        {book.id ? "Editar Livro" : "Criar Novo Livro"}
      </h2>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          {errorMessage && (
            <div className="alert alert-warning" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="nome" className="form-label">Título *</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  className="form-control"
                  value={formData.nome}
                  placeholder="Título do livro"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="autor" className="form-label">Autor *</label>
                <input
                  id="autor"
                  name="autor"
                  type="text"
                  className="form-control"
                  value={formData.autor}
                  placeholder="Nome do autor"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição *</label>
              <textarea
                id="descricao"
                name="descricao"
                className="form-control"
                rows="3"
                value={formData.descricao}
                placeholder="Descrição do livro"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="categoria" className="form-label">Categoria *</label>
                <select
                  id="categoria"
                  className="form-select"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="estoque" className="form-label">Estoque *</label>
                <input
                  id="estoque"
                  name="estoque"
                  type="number"
                  className="form-control"
                  value={formData.estoque}
                  placeholder="0"
                  min="0"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="classificacaoIdade" className="form-label">Classificação *</label>
                <input
                  id="classificacaoIdade"
                  name="classificacaoIdade"
                  type="number"
                  className="form-control"
                  value={formData.classificacaoIdade}
                  placeholder="0"
                  min="0"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={showList}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

BookForm.displayName = 'BookForm';

export default Books;   