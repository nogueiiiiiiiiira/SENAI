import { useState, useEffect, useCallback } from 'react';
import { apiBiblioteca } from '../api/server';
import { Book } from '../types';
import { MESSAGES } from '../utils/constants';

interface UseBooksReturn {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: (searchTerm?: string) => Promise<void>;
  createBook: (book: Omit<Book, 'id'>) => Promise<boolean>;
  updateBook: (id: number, book: Partial<Book>) => Promise<boolean>;
  deleteBook: (id: number) => Promise<boolean>;
}

export const useBooks = (): UseBooksReturn => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiBiblioteca.get('/books');
      let data = response.data;

      if (searchTerm) {
        data = data.filter((book: Book) =>
          book.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.id?.toString() === searchTerm
        );
      }

      setBooks(data);
    } catch (err) {
      setError(MESSAGES.ERROR_LOAD_DATA);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBook = useCallback(async (bookData: Omit<Book, 'id'>): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await apiBiblioteca.post('/books', bookData);
      await fetchBooks();
      return true;
    } catch (err) {
      setError(MESSAGES.ERROR_SAVE_DATA);
      console.error('Error creating book:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks]);

  const updateBook = useCallback(async (id: number, bookData: Partial<Book>): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await apiBiblioteca.put(`/books/${id}`, bookData);
      await fetchBooks();
      return true;
    } catch (err) {
      setError(MESSAGES.ERROR_SAVE_DATA);
      console.error('Error updating book:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks]);

  const deleteBook = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await apiBiblioteca.delete(`/books/${id}`);
      setBooks(prev => prev.filter(book => book.id !== id));
      return true;
    } catch (err) {
      setError(MESSAGES.ERROR_DELETE_DATA);
      console.error('Error deleting book:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

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
