import axios from 'axios';

const API_BASE_URL = "http://localhost:3001";
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const apiBiblioteca = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const apiBooks = axios.create({
  baseURL: GOOGLE_BOOKS_API,
});

const setAuthToken = (token) => {
  if (token) {
    apiBiblioteca.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiBiblioteca.defaults.headers.common['Authorization'];
  }
};

const getStoredToken = () => localStorage.getItem('token');

setAuthToken(getStoredToken());

export { setAuthToken, getStoredToken };
export default apiBiblioteca;
