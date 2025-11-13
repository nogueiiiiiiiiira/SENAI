# Biblioteca SENAI

Sistema de gerenciamento de biblioteca desenvolvido para o SENAI, com funcionalidades completas de CRUD para livros, empréstimos, usuários e muito mais.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Framework JavaScript moderno
- **React Router** - Roteamento de páginas
- **Bootstrap 5** - Framework CSS responsivo
- **Axios** - Cliente HTTP para requisições API
- **React Hooks** - Gerenciamento de estado e efeitos

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **bcrypt** - Hashing de senhas

## 📁 Estrutura do Projeto

```
SENAI/
├── back/                    # Backend (Node.js/Express)
│   ├── controllers/         # Controladores da API
│   ├── models/             # Modelos de dados
│   ├── routes/             # Definição das rotas
│   ├── middleware/         # Middlewares personalizados
│   ├── config/             # Configurações do banco
│   └── server.js           # Ponto de entrada do servidor
├── front/                   # Frontend (React)
│   ├── public/             # Arquivos estáticos
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   │   ├── Card.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── NavLinks.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Table.jsx
│   │   │   └── FormField.jsx
│   │   ├── pages/          # Páginas da aplicação
│   │   │   ├── books.jsx
│   │   │   ├── login.jsx
│   │   │   ├── readers.jsx
│   │   │   ├── loans.jsx
│   │   │   └── ...
│   │   ├── hooks/          # Hooks personalizados
│   │   │   ├── useBooks.js
│   │   │   └── useToast.js
│   │   ├── utils/          # Utilitários
│   │   │   ├── api.js
│   │   │   ├── validation.js
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   ├── api/            # Configuração da API
│   │   └── main.jsx        # Ponto de entrada React
└── README.md
```

## ✨ Funcionalidades

### 📚 Gerenciamento de Livros
- ✅ Listagem de livros com busca e filtros
- ✅ Cadastro de novos livros
- ✅ Edição de livros existentes
- ✅ Exclusão de livros
- ✅ Validação de formulários
- ✅ Categorização de livros

### 👥 Gerenciamento de Usuários
- ✅ Cadastro de leitores
- ✅ Autenticação (Login/Logout)
- ✅ Controle de permissões (Admin/Bibliotecário/Leitor)

### 📖 Sistema de Empréstimos
- ✅ Registro de empréstimos
- ✅ Controle de devoluções
- ✅ Gestão de multas por atraso
- ✅ Histórico de empréstimos

### 🎨 Interface do Usuário
- ✅ Design responsivo (Bootstrap)
- ✅ Componentes memoizados para performance
- ✅ Lazy loading de rotas
- ✅ Notificações toast
- ✅ Estados de loading
- ✅ Validação em tempo real

## 🛠️ Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL (versão 8 ou superior)
- npm ou yarn

### Backend
```bash
cd back
npm install
# Configure o banco de dados em config/database.js
npm start
```

### Frontend
```bash
cd front
npm install
npm run dev
```

### Acesso
- Frontend: http://localhost:5173 (Vite)
- Backend: http://localhost:3001

## 🔧 Scripts Disponíveis

### Frontend
```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

### Backend
```bash
npm start        # Inicia servidor
npm run dev      # Desenvolvimento com nodemon
```

## 📊 Melhorias Recentes

### ✅ Implementadas
- **Lazy Loading**: Carregamento sob demanda de componentes
- **Componentes Memoizados**: Otimização de performance
- **Sistema de Toast**: Notificações não-intrusivas
- **Utilitários Centralizados**: Funções reutilizáveis
- **Validação Robusta**: Formulários com validação em tempo real
- **Hooks Personalizados**: Lógica reutilizável
- **Design Responsivo**: Interface adaptável a dispositivos móveis

### 🔄 Em Desenvolvimento
- **Animações/Transições**: Melhorar UX com micro-interações
- **Modo Escuro**: Toggle para tema dark/light
- **Otimização de Assets**: Compressão de imagens e lazy loading

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedores

- **SENAI** - Desenvolvimento do sistema de biblioteca

---

**Nota**: Este projeto foi desenvolvido como parte do curso técnico do SENAI, demonstrando boas práticas de desenvolvimento web full-stack.
