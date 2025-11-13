export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateNumber = (value) => {
  return !isNaN(value) && value >= 0;
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${fieldRules.label || field} é obrigatório`;
      return;
    }

    if (value && fieldRules.validator) {
      const isValid = fieldRules.validator(value);
      if (!isValid) {
        errors[field] = fieldRules.message || `${fieldRules.label || field} é inválido`;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const bookValidationRules = {
  nome: {
    required: true,
    label: 'Título',
    validator: validateRequired
  },
  autor: {
    required: true,
    label: 'Autor',
    validator: validateRequired
  },
  descricao: {
    required: true,
    label: 'Descrição',
    validator: validateRequired
  },
  categoria: {
    required: true,
    label: 'Categoria',
    validator: validateRequired
  },
  estoque: {
    required: true,
    label: 'Estoque',
    validator: validateNumber
  },
  classificacaoIdade: {
    required: true,
    label: 'Classificação',
    validator: validateNumber
  }
};

export const loginValidationRules = {
  email: {
    required: true,
    label: 'Email',
    validator: validateEmail,
    message: 'Email inválido'
  },
  senha: {
    required: true,
    label: 'Senha',
    validator: validatePassword,
    message: 'Senha deve ter pelo menos 6 caracteres'
  }
};
