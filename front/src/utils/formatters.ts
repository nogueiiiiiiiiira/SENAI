export const formatDate = (date: string | Date): string => {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return '';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateForInput = (date: string): string => {
  if (!date) return '';

  // Convert DD/MM/YYYY to YYYY-MM-DD
  const parts = date.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }

  return date;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatCPF = (cpf: string): string => {
  if (!cpf) return '';
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatTelefone = (telefone: string): string => {
  if (!telefone) return '';
  return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatBookTitle = (title: string): string => {
  return capitalize(title);
};

export const formatAuthorName = (name: string): string => {
  return capitalize(name);
};

export const formatCategoryName = (category: string): string => {
  return capitalize(category);
};

export const getAgeFromBirthDate = (birthDate: string): number => {
  if (!birthDate) return 0;

  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const isOverdue = (dueDate: string): boolean => {
  if (!dueDate) return false;

  const today = new Date();
  const due = new Date(dueDate);

  return today > due;
};

export const getDaysOverdue = (dueDate: string): number => {
  if (!dueDate) return 0;

  const today = new Date();
  const due = new Date(dueDate);

  const diffTime = today.getTime() - due.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};

export const calculateFine = (daysOverdue: number, dailyRate: number = 0.50): number => {
  return daysOverdue * dailyRate;
};
