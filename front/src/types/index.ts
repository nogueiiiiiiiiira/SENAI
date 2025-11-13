export interface Book {
  id?: number;
  nome: string;
  autor: string;
  descricao: string;
  categoria: string;
  estoque: number;
  classificacaoIdade: number;
}

export interface Reader {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNasc: string;
}

export interface Librarian {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNasc: string;
  senha: string;
}

export interface Loan {
  id?: number;
  idLivro: number;
  idLeitor: number;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  status: string;
}

export interface Fine {
  id?: number;
  idEmprestimo: number;
  valor: number;
  status: string;
}

export interface Return {
  id?: number;
  idEmprestimo: number;
  dataDevolucao: string;
}

export interface Message {
  id?: number;
  nome: string;
  assunto: string;
  mensagem: string;
  telefone: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  as?: 'input' | 'textarea' | 'select';
  rows?: number;
  options?: { value: string; label: string }[];
  min?: number;
  col?: number;
}

export interface TableColumn<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  error?: string;
  searchable?: boolean;
  paginated?: boolean;
  onSearch?: (term: string) => void;
}

export interface ConfirmDialogProps {
  show: boolean;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: Librarian | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

export interface AppContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}
