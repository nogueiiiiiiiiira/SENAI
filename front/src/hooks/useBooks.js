import { useState, useEffect, useCallback } from 'react';
import { apiBiblioteca } from '../utils/api';
import { MESSAGES } from '../utils/constants';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiBiblioteca.get('/books');
      let data = response.data;

      if (searchTerm) {
        data = data.filter((book) => {
          const term = searchTerm.toLowerCase();
          return (
            book.nome?.toLowerCase().includes(term) ||
            book.autor?.toLowerCase().includes(term) ||
            book.categoria?.toLowerCase().includes(term) ||
            book.descricao?.toLowerCase().includes(term) ||
            book.id?.toString().includes(term)
          );
        });
      }

      setBooks(data);
    } catch (err) {
      setError('Erro ao carregar livros');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBook = useCallback(async (bookData) => {
    setLoading(true);
    setError(null);
    try {
      await apiBiblioteca.post('/books', bookData);
      await fetchBooks(); // Refresh list
      return true;
    } catch (err) {
      setError('Erro ao criar livro');
      console.error('Error creating book:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks]);

  const updateBook = useCallback(async (id, bookData) => {
    setLoading(true);
    setError(null);
    try {
      await apiBiblioteca.put(`/books/${id}`, bookData);
      await fetchBooks(); // Refresh list
      return true;
    } catch (err) {
      setError('Erro ao atualizar livro');
      console.error('Error updating book:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks]);

  const deleteBook = useCallback(async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este livro?')) {
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      await apiBiblioteca.delete(`/books/${id}`);
      await fetchBooks(); // Refresh list
      return true;
    } catch (err) {
      setError('Erro ao deletar livro');
      console.error('Error deleting book:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    loading,
    error,
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
  };
};
