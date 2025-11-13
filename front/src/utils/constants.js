export const BOOK_CATEGORIES = [
  "Autoajuda",
  "Biografia e Autobiografia",
  "Clássicos",
  "Desenvolvimento Pessoal",
  "Distopia",
  "Ficção Científica",
  "Fantasia",
  "História",
  "Juvenil",
  "Poesia",
  "Romance",
  "Suspense e Mistério"
];

export const LOAN_STATUS = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'concluido', label: 'Concluído' },
  { value: 'atrasado', label: 'Atrasado' },
  { value: 'cancelado', label: 'Cancelado' }
];

export const USER_ROLES = [
  { value: 'admin', label: 'Administrador' },
  { value: 'librarian', label: 'Bibliotecário' },
  { value: 'reader', label: 'Leitor' }
];

export const TABLE_PAGE_SIZE = 10;
export const MAX_TEXT_LENGTH = 100;
export const API_TIMEOUT = 10000;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/Login',
  BOOKS: '/Books',
  READERS: '/Readers',
  LIBRARIANS: '/Librarians',
  LOANS: '/Loans',
  RETURNS: '/Returns',
  FINES: '/Fines',
  API_BOOKS: '/apiBooks',
  PRIMEIRO_ACESSO: '/PrimeiroAcesso',
  SOBRE_NOS: '/SobreNos',
  CONTACT: '/contatos',
  MENSAGENS: '/mensagens',
  HISTORICO: '/historico'
};

export const MESSAGES = {
  CONFIRM_DELETE: 'Tem certeza que deseja deletar este item?',
  SUCCESS_SAVE: 'Salvo com sucesso!',
  ERROR_SAVE: 'Erro ao salvar. Tente novamente.',
  ERROR_LOAD: 'Erro ao carregar dados.',
  NO_DATA: 'Nenhum dado encontrado.',
  LOADING: 'Carregando...'
};
