export const BOOK_CATEGORIES = [
  'Autoajuda',
  'Biografia e Autobiografia',
  'Clássicos',
  'Desenvolvimento Pessoal',
  'Distopia',
  'Ficção Científica',
  'Fantasia',
  'História',
  'Juvenil',
  'Poesia',
  'Romance',
  'Suspense e Mistério',
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/Login',
  BOOKS: '/Books',
  READERS: '/Readers',
  LOANS: '/Loans',
  RETURNS: '/Returns',
  FINES: '/Fines',
  LIBRARIANS: '/Librarians',
  API_BOOKS: '/apiBooks',
  MESSAGES: '/mensagens',
  HISTORICO: '/historico',
  SOBRE_NOS: '/SobreNos',
  CONTATOS: '/contatos',
  PRIMEIRO_ACESSO: '/PrimeiroAcesso',
};

export const MESSAGES = {
  CONFIRM_DELETE_BOOK: 'Tem certeza que deseja deletar este livro?',
  CONFIRM_DELETE_READER: 'Tem certeza que deseja deletar este leitor?',
  CONFIRM_DELETE_LOAN: 'Tem certeza que deseja deletar este empréstimo?',
  BOOK_CREATED: 'Livro criado com sucesso!',
  BOOK_UPDATED: 'Livro atualizado com sucesso!',
  BOOK_DELETED: 'Livro deletado com sucesso!',
  READER_CREATED: 'Leitor criado com sucesso!',
  READER_UPDATED: 'Leitor atualizado com sucesso!',
  READER_DELETED: 'Leitor deletado com sucesso!',
  LOAN_CREATED: 'Empréstimo criado com sucesso!',
  LOAN_UPDATED: 'Empréstimo atualizado com sucesso!',
  LOAN_DELETED: 'Empréstimo deletado com sucesso!',
  ERROR_GENERIC: 'Ocorreu um erro. Tente novamente.',
  ERROR_LOAD_DATA: 'Erro ao carregar dados.',
  ERROR_SAVE_DATA: 'Erro ao salvar dados.',
  ERROR_DELETE_DATA: 'Erro ao deletar dados.',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
  CPF_EXISTS: 'CPF já existe!',
  EMAIL_EXISTS: 'Email já existe!',
  TELEFONE_EXISTS: 'Telefone já existe!',
};

export const API_ENDPOINTS = {
  BOOKS: '/books',
  READERS: '/readers',
  LOANS: '/loans',
  RETURNS: '/returns',
  FINES: '/fines',
  LIBRARIANS: '/librarians',
  MESSAGES: '/mensagens',
  LOGIN: '/login',
};

export const VALIDATION_RULES = {
  REQUIRED: 'Este campo é obrigatório',
  EMAIL_INVALID: 'Email inválido',
  CPF_INVALID: 'CPF inválido',
  TELEFONE_INVALID: 'Telefone inválido',
  MIN_LENGTH: (min: number) => `Mínimo ${min} caracteres`,
  MAX_LENGTH: (max: number) => `Máximo ${max} caracteres`,
  MIN_VALUE: (min: number) => `Valor mínimo: ${min}`,
  MAX_VALUE: (max: number) => `Valor máximo: ${max}`,
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const DEBOUNCE_DELAY = 300;
