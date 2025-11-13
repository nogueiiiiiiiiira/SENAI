import { BOOK_CATEGORIES, VALIDATION_RULES } from './constants';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCPF = (cpf: string): boolean => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
};

export const validateTelefone = (telefone: string): boolean => {
  const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return telefoneRegex.test(telefone);
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (typeof value === 'number') {
    return !isNaN(value);
  }
  return value != null;
};

export const validateMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const validateMaxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

export const validateMinValue = (value: number, min: number): boolean => {
  return value >= min;
};

export const validateMaxValue = (value: number, max: number): boolean => {
  return value <= max;
};

export const bookValidationRules = {
  nome: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => validateMinLength(value, 2), message: VALIDATION_RULES.MIN_LENGTH(2) },
    { validate: (value: string) => validateMaxLength(value, 100), message: VALIDATION_RULES.MAX_LENGTH(100) },
  ],
  autor: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => validateMinLength(value, 2), message: VALIDATION_RULES.MIN_LENGTH(2) },
    { validate: (value: string) => validateMaxLength(value, 100), message: VALIDATION_RULES.MAX_LENGTH(100) },
  ],
  descricao: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => validateMinLength(value, 10), message: VALIDATION_RULES.MIN_LENGTH(10) },
    { validate: (value: string) => validateMaxLength(value, 1000), message: VALIDATION_RULES.MAX_LENGTH(1000) },
  ],
  categoria: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => BOOK_CATEGORIES.includes(value), message: 'Categoria inválida' },
  ],
  estoque: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: number) => validateMinValue(value, 0), message: VALIDATION_RULES.MIN_VALUE(0) },
    { validate: (value: number) => validateMaxValue(value, 10000), message: VALIDATION_RULES.MAX_VALUE(10000) },
  ],
  classificacaoIdade: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: number) => validateMinValue(value, 0), message: VALIDATION_RULES.MIN_VALUE(0) },
    { validate: (value: number) => validateMaxValue(value, 18), message: VALIDATION_RULES.MAX_VALUE(18) },
  ],
};

export const readerValidationRules = {
  nome: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => validateMinLength(value, 2), message: VALIDATION_RULES.MIN_LENGTH(2) },
    { validate: (value: string) => validateMaxLength(value, 100), message: VALIDATION_RULES.MAX_LENGTH(100) },
  ],
  cpf: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: validateCPF, message: VALIDATION_RULES.CPF_INVALID },
  ],
  email: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: validateEmail, message: VALIDATION_RULES.EMAIL_INVALID },
  ],
  telefone: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: validateTelefone, message: VALIDATION_RULES.TELEFONE_INVALID },
  ],
  dataNasc: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
  ],
};

export const librarianValidationRules = {
  ...readerValidationRules,
  senha: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => validateMinLength(value, 6), message: VALIDATION_RULES.MIN_LENGTH(6) },
  ],
};

export const loginValidationRules = {
  email: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: validateEmail, message: VALIDATION_RULES.EMAIL_INVALID },
  ],
  senha: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
  ],
};

export const messageValidationRules = {
  nome: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => validateMinLength(value, 2), message: VALIDATION_RULES.MIN_LENGTH(2) },
  ],
  assunto: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => validateMinLength(value, 5), message: VALIDATION_RULES.MIN_LENGTH(5) },
  ],
  mensagem: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: (value: string) => validateMinLength(value, 10), message: VALIDATION_RULES.MIN_LENGTH(10) },
  ],
  telefone: [
    { validate: validateRequired, message: VALIDATION_RULES.REQUIRED },
    { validate: validateTelefone, message: VALIDATION_RULES.TELEFONE_INVALID },
  ],
};

export const validateForm = (data: Record<string, any>, rules: Record<string, any[]>): ValidationResult => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = data[field];

    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        errors[field] = rule.message;
        break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
