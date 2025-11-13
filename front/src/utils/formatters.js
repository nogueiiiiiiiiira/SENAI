export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleString('pt-BR');
  } catch {
    return dateString;
  }
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatNumber = (value) => {
  if (value === null || value === undefined) return '0';
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const getStatusColor = (status) => {
  const colors = {
    'ativo': 'success',
    'inativo': 'secondary',
    'pendente': 'warning',
    'cancelado': 'danger',
    'concluido': 'success',
    'atrasado': 'danger'
  };
  return colors[status?.toLowerCase()] || 'primary';
};

export const getStatusText = (status) => {
  const texts = {
    'ativo': 'Ativo',
    'inativo': 'Inativo',
    'pendente': 'Pendente',
    'cancelado': 'Cancelado',
    'concluido': 'Concluído',
    'atrasado': 'Atrasado'
  };
  return texts[status?.toLowerCase()] || capitalizeFirst(status);
};
